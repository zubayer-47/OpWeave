import clsx from 'clsx';
import { Bell, Compass, MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../../assets/default.jpg';
import Button from '../../../components/Buttons/Button';
import ClickableDropdown from '../../../components/ClickableDropdown';
import { useJoinMemberMutation } from '../../../features/community/communityApi';
import { CommunityItemResType } from '../../../features/community/types';

interface Props extends CommunityItemResType {
	isSuggested?: boolean;
	isSuggestedBox?: boolean;
}

const CommunityItem = ({
	community_id,
	avatar,
	bio,
	name,
	isSuggested,
	isSuggestedBox,
}: Props) => {
	const [joinMember] = useJoinMemberMutation();

	const handleJoinMember = async () => {
		await toast.promise(joinMember(community_id).unwrap(), {
			loading: 'Joining...',
			success: 'Member Joined.',
			error: 'Could not join.',
		});
	};

	return (
		<div
			className={clsx(
				'snap-center dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all py-3 px-4 flex justify-between items-center rounded-2xl relative',
				{
					'snap-center !bg-transparent transition-colors !p-2 !border-none flex justify-between items-center':
						isSuggestedBox,
				}
			)}
		>
			<div
				className={clsx('flex justify-center items-center gap-3 md:gap-5', {
					'!gap-2': isSuggestedBox,
				})}
			>
				<Link to={`/communities/${community_id}?sec=posts`}>
					<LazyLoadImage
						className={clsx('profile size-12 md:size-14', {
							'!size-10': isSuggestedBox,
						})}
						src={avatar || defaultAvatar}
						alt='community profile'
						effect='blur'
					/>
				</Link>
				<div>
					<Link
						to={`/communities/${community_id}?sec=posts`}
						className={clsx('title', { 'font-normal': isSuggestedBox })}
					>
						{name}
					</Link>
					<p className='title font-normal text-sm text-dark-muted'>{bio}</p>
				</div>
			</div>

			{isSuggested ? (
				<Button text='Join' size='small' onClick={handleJoinMember} />
			) : (
				<ClickableDropdown
					button={
						<button type='button'>
							<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary' />
						</button>
					}
				>
					<div className='dark:bg-dark-primary px-1 absolute right-3 -bottom-20 flex flex-col border dark:border-dark-border rounded-xl z-10'>
						<button
							// onClick={handleClose}
							className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
						>
							<Compass className='text-light-primary' strokeWidth={1.5} />
							<h3 className='title text-sm font-normal'>More Option</h3>
						</button>
						<hr className='border-t-2 dark:border-dark-border' />
						<button
							// onClick={handleClose}
							className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
						>
							<Bell className='text-light-primary' strokeWidth={1.5} />
							<h3 className='title text-sm font-normal'>More Option</h3>
						</button>
					</div>
				</ClickableDropdown>
			)}
		</div>
	);
};

export default CommunityItem;
