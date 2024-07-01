import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import {
	GripHorizontal,
	MoreHorizontal,
	Target,
	UserMinus,
} from 'lucide-react';
import { ReactNode } from 'react';
import ContentLoader from 'react-content-loader';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useParams } from 'react-router-dom';
import data from '../../../data.json';
import Button from '../../components/Buttons/Button';
import ClickableDropdown from '../../components/ClickableDropdown';
import Hr from '../../components/Hr';
import Photos from '../../components/Photos';
import Videos from '../../components/Videos';
import {
	useGetCommunityQuery,
	useJoinMemberMutation,
	useLeaveMemberMutation,
} from '../../features/community/communityApi';
import type { Community } from '../../features/community/types';
import { MemberRole } from '../../features/community/types';
import useQuery from '../../hooks/useQueryParams';
import Info from './profile/Info';
import Members from './profile/Members';
import Posts from './profile/Posts';

const slicedData = data.slice(10, 20);

const Community = () => {
	const query = useQuery();
	const params = useParams();
	const { data, isLoading } = useGetCommunityQuery(params?.id || skipToken);

	let content: ReactNode;
	if (!query.get('sec')) content = <Posts />;
	else if (query.get('sec') === 'posts') content = <Posts />;
	else if (query.get('sec') === 'info') content = <Info />;
	else if (query.get('sec') === 'photos')
		content = <Photos data={slicedData} />;
	else if (query.get('sec') === 'videos')
		content = <Videos data={slicedData} />;
	else if (query.get('sec') === 'members') content = <Members />;

	const navLinkStyles = 'border-b-[3px] rounded-sm px-3 border-blue-primary';

	const isJoined = !!(data as Community)?.member_id;

	return (
		<div className='mt-0 md:mt-28 mb-10'>
			{isLoading ? (
				<ContentLoader
					speed={2}
					// width={300}
					// height={70}
					// viewBox='0 0 300 70'
					backgroundColor='#495565'
					foregroundColor='#B9C0CB'
					className='w-full'
				>
					<circle cx='125' cy='75' r='70' />
					<rect x='210' y='90' rx='6' ry='6' width='150' height='15' />
					<rect x='210' y='115' rx='6' ry='6' width='200' height='15' />
				</ContentLoader>
			) : (
				<>
					<div className='md:hidden w-full flex justify-end mb-10'>
						<Clickable
							// data={isJoined ? (data as Community) : undefined}
							data={data as Community}
							id={params.id}
							isJoined={isJoined}
						/>
					</div>
					{/* // <div className='flex items-center justify-between px-14 relative'> */}
					<div className='grid grid-cols-8 items-center px-14 relative'>
						<div className='col-span-full md:col-span-7 flex flex-col items-center md:flex-row md:items-end gap-5'>
							<LazyLoadImage
								className='size-36 object-cover rounded-full'
								src={data?.avatar}
								alt='community profile'
								effect='blur'
							/>

							<div className='mb-3 text-center md:text-left'>
								<h1 className='title text-xl'>{data?.name}</h1>
								<span className='muted'>{data?.bio}</span>
							</div>
						</div>

						<div className='hidden md:flex justify-end'>
							<Clickable
								// data={isJoined ? (data as Community) : undefined}
								data={data as Community}
								id={params.id}
								isJoined={isJoined}
							/>
						</div>
					</div>
				</>
			)}

			<div className='container lg:max-w-full mx-auto max-w-102 w-full flex items-center gap-10 mt-10 mb-0.5 px-10 overflow-x-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'>
				<Link
					to={`/communities/${params.id}?sec=posts`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'posts' && navLinkStyles
					)}
				>
					Posts
				</Link>
				<Link
					to={`/communities/${params.id}?sec=info`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'info' && navLinkStyles
					)}
				>
					Info
				</Link>
				<Link
					to={`/communities/${params.id}?sec=photos`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'photos' && navLinkStyles
					)}
				>
					Photos
				</Link>
				<Link
					to={`/communities/${params.id}?sec=videos`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'videos' && navLinkStyles
					)}
				>
					Videos
				</Link>
				<Link
					to={`/communities/${params.id}?sec=members&filterBy=all`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'members' && navLinkStyles
					)}
				>
					Members
				</Link>
			</div>
			<Hr />

			{content}
		</div>
	);
};

function Clickable({
	data,
	id,
	isJoined,
}: {
	data: Community;
	id: string | undefined;
	isJoined: boolean;
}) {
	const [leaveMember] = useLeaveMemberMutation();
	const [joinMember] = useJoinMemberMutation();

	const handleJoinMember = () => {
		toast.promise(joinMember(data ? data.community_id : '').unwrap(), {
			loading: 'Joining...',
			success: 'Member Joined.',
			error: 'Could not join.',
		});
	};

	const handleLeaveMember = () => {
		if (data) {
			toast.promise(leaveMember(data.community_id).unwrap(), {
				loading: 'Leaving...',
				success: 'Leaved Successfully.',
				error: "Couldn't leave.",
			});
		}
	};

	return (
		<>
			{!isJoined ? (
				<Button text='Join' onClick={handleJoinMember} />
			) : (
				<ClickableDropdown
					button={
						<button type='button'>
							<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary' />
						</button>
					}
				>
					<div className='dark:bg-dark-primary px-1 absolute right-10 md:right-20 top-44 md:top-20 flex flex-col border dark:border-dark-border rounded-xl z-10'>
						{data?.role === MemberRole.MEMBER ? (
							<button
								type='button'
								className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
								onClick={handleLeaveMember}
							>
								<UserMinus className='text-light-primary' strokeWidth={1.5} />
								<h3 className='title text-sm font-normal'>Leave</h3>
							</button>
						) : (
							<>
								<Link
									to={`/communities/${id}/pending`}
									className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
								>
									<Target className='text-light-primary' strokeWidth={1.5} />
									<h3 className='title text-sm font-normal'>Approve Posts</h3>
								</Link>
								<hr className='border-t-2 dark:border-dark-border' />
								<Link
									to={`/communities/${id}/manage`}
									className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
								>
									<GripHorizontal
										className='text-light-primary'
										strokeWidth={1.5}
									/>
									<h3 className='title text-sm font-normal'>Manage</h3>
								</Link>
								<hr className='border-t-2 dark:border-dark-border' />
							</>
						)}
					</div>
				</ClickableDropdown>
			)}
		</>
	);
}

export default Community;
