import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import {
	GripHorizontal,
	MoreHorizontal,
	Target,
	UserMinus,
} from 'lucide-react';
import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import ContentLoader from 'react-content-loader';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useParams } from 'react-router-dom';
import data from '../../../data.json';
import { useAppDispatch } from '../../app/hooks';
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
import { postApi } from '../../features/post/postApi';
import { CommunityPostsResType, Post } from '../../features/post/types';
import useQuery from '../../hooks/useQueryParams';
import CenterLayout from '../../layouts/CenterLayout';
import Info from './profile/Info';
import Members from './profile/Members';
import Posts from './profile/Posts';

const slicedData = data.slice(10, 20);

export type StatusStateType = { isLoading: boolean; isError: boolean };
const POSTS_PER_PAGE = 10;

const Community = () => {
	const query = useQuery();
	const params = useParams();
	const { data: communityData, isLoading } = useGetCommunityQuery(
		params?.id || skipToken
	);

	// Pagination------------------
	const [postsState, setPostsState] = useState<CommunityPostsResType>({
		posts: [],
		hasMore: false,
		totalCount: 0,
		totalPendingPost: 0,
	});
	const [statusState, setStatusState] = useState<StatusStateType>({
		isError: false,
		isLoading: false,
	});
	const queryPage = parseInt(query.get('page') as string, 10);

	const [page, setPage] = useState(queryPage || 1);

	const dispatch = useAppDispatch();
	// const navigate = useNavigate();
	// const location = useLocation();
	const scrollDivRef = useRef<HTMLDivElement>(null);

	const fetchMoreData = useCallback(
		async (pageNum: number = page) => {
			try {
				setStatusState(() => ({
					isError: false,
					isLoading: true,
				}));

				const { data, isSuccess } = await dispatch(
					postApi.endpoints.getCommunityPosts.initiate({
						community_id: params.id!,
						page: pageNum,
					})
				);

				if (data?.posts.length === 0) {
					// setHasMore(false);
				} else {
					if (isSuccess) {
						setPostsState((prevItems) => ({
							posts: [...new Set([...prevItems.posts, ...data.posts])],
							hasMore: data.hasMore,
							totalCount: data.totalCount,
							totalPendingPost: data.totalPendingPost,
						}));
					}
				}
				setStatusState((prev) => ({
					...prev,
					isLoading: false,
				}));
			} catch (error) {
				setStatusState((prev) => ({
					...prev,
					isError: true,
				}));
			}
		},
		[page, postsState.hasMore]
	);

	useEffect(() => {
		fetchMoreData(page);
	}, [page]);

	const fetchNext = () => {
		if (postsState.hasMore) {
			setPage((prev) => prev + 1);

			if (scrollDivRef.current) {
				scrollDivRef.current.scrollTop = 0;
			}

			// navigate(`${location.pathname}/?sec=posts&page=${page + 1}`);
		}
	};

	const fetchPrev = () => {
		if (page > 1) {
			setPage((prev) => prev - 1);
			// navigate(`${location.pathname}/?sec=posts&page=${page + 1}`);
		}
	};

	const currentPagePosts: Post[] = useMemo(() => {
		const startIndex = (page - 1) * POSTS_PER_PAGE;
		const endIndex = startIndex + POSTS_PER_PAGE;
		return postsState.posts.slice(startIndex, endIndex);
	}, [postsState]);

	// Pagination--------------

	let content: ReactNode;
	if (!query.get('sec'))
		content = (
			<Posts
				page={page}
				currentPagePosts={currentPagePosts}
				postsState={postsState}
				statusState={statusState}
				fetchNext={fetchNext}
				fetchPrev={fetchPrev}
			/>
		);
	else if (query.get('sec') === 'posts')
		content = (
			<Posts
				page={page}
				currentPagePosts={currentPagePosts}
				postsState={postsState}
				statusState={statusState}
				fetchNext={fetchNext}
				fetchPrev={fetchPrev}
			/>
		);
	else if (query.get('sec') === 'info') content = <Info />;
	else if (query.get('sec') === 'photos')
		content = <Photos data={slicedData} />;
	else if (query.get('sec') === 'videos')
		content = <Videos data={slicedData} />;
	else if (query.get('sec') === 'members') content = <Members />;

	const navLinkStyles = 'border-b-[3px] rounded-sm px-3 border-blue-primary';

	const isJoined = !!(communityData as Community)?.member_id;

	return (
		<CenterLayout hasNav>
			<div
				className={clsx(
					// 'mt-0 md:mt-28 mb-10',
					'w-full height_without_nav py-5 overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
				)}
				ref={scrollDivRef}
			>
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
								data={communityData as Community}
								id={params.id}
								isJoined={isJoined}
							/>
						</div>
						{/* // <div className='flex items-center justify-between px-14 relative'> */}
						<div className='grid grid-cols-8 items-center px-14 relative'>
							<div className='col-span-full md:col-span-7 flex flex-col items-center md:flex-row md:items-end gap-5'>
								<LazyLoadImage
									className='size-36 object-cover rounded-full'
									src={communityData?.avatar}
									alt='community profile'
									effect='blur'
								/>

								<div className='mb-3 text-center md:text-left'>
									<h1 className='title text-xl'>{communityData?.name}</h1>
									<span className='muted'>{communityData?.bio}</span>
								</div>
							</div>

							<div className='hidden md:flex justify-end'>
								<Clickable
									// data={isJoined ? (data as Community) : undefined}
									data={communityData as Community}
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
		</CenterLayout>
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
