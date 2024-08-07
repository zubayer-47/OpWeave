import clsx from 'clsx';
import { Ban, MoreHorizontal, User2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/Buttons/Button';
import ClickableDropdown from '../../../../components/ClickableDropdown';
import { useBanMemberMutation } from '../../../../features/authority/authorityApi';
import {
	MemberRestrictions,
	MemberRole,
	MemberType,
} from '../../../../features/community/types';

type Props = MemberType & { current_user_role: MemberRole };

const MemberItem = ({
	member_id,
	user: { fullname, username, avatar },
	current_user_role,
	restricts,
	banUntil,
	role,
}: Props) => {
	const [banMember] = useBanMemberMutation();
	const navigate = useNavigate();
	const params = useParams();

	const handleVisitProfile = () => {
		navigate(`/profile/${username}?sec=timeline`);
	};

	const handleBan = () => {
		toast.promise(banMember({ member_id, community_id: params.id! }).unwrap(), {
			loading: 'Ban Loading',
			success: 'Member banned',
			error: "Couldn't ban",
		});
	};

	return (
		<div className='flex justify-between items-center relative'>
			<div className='flex items-center gap-2'>
				<Link to={`/profile/${username}?sec=timeline`}>
					<LazyLoadImage
						src={avatar}
						className='profile'
						alt="Member's Profile"
						effect='blur'
					/>
				</Link>

				<div>
					<Link to={`/profile/${username}?sec=timeline`}>
						<h1
							className={clsx(
								'title font-normal relative'
								// {
								// "dark:text-dark-muted after:content-['*'] after:text-rose-500":
								// 	restricts === MemberRestrictions.BAN &&
								// 	new Date() < new Date(banUntil),
								// }
							)}
						>
							{restricts === MemberRestrictions.BAN &&
							new Date() < new Date(banUntil) ? (
								<Ban className='absolute -top-1 -right-5 text-red size-4' />
							) : null}
							{fullname}
						</h1>
					</Link>
					<span className='muted'>{role}</span>
				</div>
			</div>

			{/* <Button
				onClick={handleVisitProfile}
				text='View Profile'
				icon={<User2 className='size-5' />}
				size='small'
				variant='outline'
			/> */}

			{current_user_role !== MemberRole.MEMBER ? (
				<ClickableDropdown
					button={
						<button type='button'>
							<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary transition-colors' />
						</button>
					}
				>
					<div className='dark:bg-dark-primary px-1 absolute right-5 top-8 flex flex-col border dark:border-dark-border rounded-xl z-10'>
						<button
							onClick={handleBan}
							className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
							type='button'
						>
							<Ban className='text-red' strokeWidth={1.5} />
							<h3 className='title text-sm font-normal '>Ban Member</h3>
						</button>
					</div>
				</ClickableDropdown>
			) : (
				<Button
					onClick={handleVisitProfile}
					text='View Profile'
					icon={<User2 className='size-5' />}
					size='small'
					variant='outline'
				/>
			)}
		</div>
	);
};

export default MemberItem;
