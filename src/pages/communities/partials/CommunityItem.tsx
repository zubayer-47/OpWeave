import { Bell, Compass, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../../assets/default.jpg';
import ClickableDropdown from '../../../components/ClickableDropdown';
import { Community } from '../../../features/community/types';

interface Props extends Omit<Community, 'rules'> {
	community_id: string;
}

const CommunityItem = ({ community_id, avatar, bio, name }: Props) => {
	return (
		<div className='snap-center dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all py-3 px-4 flex justify-between items-center rounded-2xl relative'>
			<div className='flex justify-center items-center gap-3 md:gap-5'>
				<Link to={`/communities/${community_id}?sec=posts`}>
					<img
						className='profile size-12 md:size-14'
						src={avatar || defaultAvatar}
						alt='community profile'
					/>
				</Link>
				<div>
					<Link to={`/communities/${community_id}?sec=posts`} className='title'>
						{name}
					</Link>
					<p className='title font-normal text-sm text-dark-muted'>{bio}</p>
				</div>
			</div>

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
		</div>
	);
};

export default CommunityItem;
