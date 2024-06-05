import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { GripHorizontal, MoreHorizontal, Target } from 'lucide-react';
import { ReactNode } from 'react';
import ContentLoader from 'react-content-loader';
import { Link, useParams } from 'react-router-dom';
import data from '../../../data.json';
import Button from '../../components/Buttons/Button';
import ClickableDropdown from '../../components/ClickableDropdown';
import Hr from '../../components/Hr';
import Photos from '../../components/Photos';
import Videos from '../../components/Videos';
import { useGetCommunityQuery } from '../../features/community/communityApi';
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

	const isJoined = true;

	return (
		<div className='mt-28 mb-10'>
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
				<div className='flex items-center justify-between px-14 relative'>
					<div className='flex items-end gap-5'>
						<img
							className='size-36 object-cover rounded-full'
							src={data?.avatar}
							alt='community profile'
						/>

						<div className='mb-3'>
							<h1 className='title text-xl'>{data?.name}</h1>
							<span className='muted'>{data?.bio}</span>
						</div>
					</div>

					{!isJoined ? (
						<Button text='Join' />
					) : (
						<ClickableDropdown
							button={
								<button type='button'>
									<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary' />
								</button>
							}
						>
							<div className='dark:bg-dark-primary px-1 absolute right-16 top-24 flex flex-col border dark:border-dark-border rounded-xl z-10'>
								{data?.member.role === MemberRole.MEMBER ? null : (
									<>
										<Link
											to={`/communities/${params.id}/pending`}
											className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
										>
											<Target
												className='text-light-primary'
												strokeWidth={1.5}
											/>
											<h3 className='title text-sm font-normal'>
												Approve Posts
											</h3>
										</Link>
										<hr className='border-t-2 dark:border-dark-border' />
										<Link
											to={`/communities/${params.id}/manage`}
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

								<Link
									to=''
									className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
								>
									<GripHorizontal
										className='text-light-primary'
										strokeWidth={1.5}
									/>
									<h3 className='title text-sm font-normal'>More Options</h3>
								</Link>
							</div>
						</ClickableDropdown>
					)}
				</div>
			)}

			<div className='flex justify-start items-center gap-20 mt-10 mb-0.5 px-14'>
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

export default Community;
