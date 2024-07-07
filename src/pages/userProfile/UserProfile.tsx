import clsx from 'clsx';
import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import Hr from '../../components/Hr';
import Communities from './partials/Communities';
import Timeline from './partials/Timeline';

import { skipToken } from '@reduxjs/toolkit/query';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import data from '../../../data.json';
import { useAppDispatch } from '../../app/hooks';
import Photos from '../../components/Photos';
import Videos from '../../components/Videos';
import { postApi } from '../../features/post/postApi';
import { FeedResType, Post } from '../../features/post/types';
import { useGetUserProfileQuery } from '../../features/user/userApi';
import useQueryParams from '../../hooks/useQueryParams';
import CenterLayout from '../../layouts/CenterLayout';
import { StatusStateType } from '../community/Community';
import Bookmarks from './partials/Bookmarks';

const slicedData = data.slice(10, 20);
const POSTS_PER_PAGE = 10;

const UserProfile = () => {
	const params = useParams();
	const { data } = useGetUserProfileQuery(params.username || skipToken);
	const query = useQueryParams();

	// Pagination------------------
	const [postsState, setPostsState] = useState<FeedResType>({
		posts: [],
		hasMore: false,
		totalCount: 0,
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
	const prevUsername = useRef<string>();

	const fetchMoreData = useCallback(
		async (pageNum: number = page) => {
			// console.log(params.username, 'username from fetchMoreData');
			try {
				setStatusState(() => ({
					isError: false,
					isLoading: true,
				}));

				const isEqualUsername = prevUsername.current === params.username;

				setPage((prev) => (isEqualUsername ? prev : 1));

				const { data, isSuccess } = await dispatch(
					postApi.endpoints.getUserPosts.initiate({
						username: params.username!,
						page: isEqualUsername ? pageNum : 1,
					})
				);

				if (isSuccess) {
					console.log(
						params.username,
						prevUsername,
						'username from fetchMoreData'
					);

					setPostsState((prevItems) => {
						console.log({ isEqualUsername });

						return {
							posts: isEqualUsername
								? [...new Set([...prevItems.posts, ...data.posts])]
								: data.posts,
							hasMore: data.hasMore,
							totalCount: data.totalCount,
						};
					});
				}

				prevUsername.current = params.username!;

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
		[page, postsState.hasMore, params.username]
	);

	useEffect(() => {
		if (!prevUsername.current) {
			prevUsername.current = params.username;
		}

		fetchMoreData(page);
	}, [page, params.username]);

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

	// console.log(postsState.posts);

	let content: ReactNode;
	if (!query.get('sec'))
		content = (
			<Timeline
				page={page}
				currentPagePosts={currentPagePosts}
				postsState={postsState}
				statusState={statusState}
				fetchNext={fetchNext}
				fetchPrev={fetchPrev}
			/>
		);
	else if (query.get('sec') === 'timeline')
		content = (
			<Timeline
				page={page}
				currentPagePosts={currentPagePosts}
				postsState={postsState}
				statusState={statusState}
				fetchNext={fetchNext}
				fetchPrev={fetchPrev}
			/>
		);
	else if (query.get('sec') === 'communities') content = <Communities />;
	else if (query.get('sec') === 'bookmarks')
		content = <Bookmarks scrollDivRef={scrollDivRef} />;
	else if (query.get('sec') === 'photos')
		content = <Photos data={slicedData} />;
	else if (query.get('sec') === 'videos')
		content = <Videos data={slicedData} />;

	const navLinkStyles = 'border-b-[3px] rounded-sm px-3 border-blue-primary';

	return (
		<CenterLayout hasNav>
			<div
				className={clsx(
					// 'mt-0 md:mt-28 mb-10',
					'w-full height_without_nav py-5 overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary',
					'px-2 md:px-0'
				)}
				ref={scrollDivRef}
			>
				<div className='flex justify-center items-center'>
					<div className='flex flex-col justify-center items-center'>
						<LazyLoadImage
							src={data?.avatar}
							className='size-36 md:size-52 object-cover rounded-full'
							alt='user profile'
							effect='blur'
						/>

						<h1 className='title text-xl md:text-2xl mt-5'>{data?.fullname}</h1>
						<span className='muted'>{data?.bio}</span>
					</div>
					N
				</div>

				<div className='container mx-auto max-w-102 w-full flex items-center gap-10 mt-10 mb-0.5 px-10 overflow-x-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'>
					<Link
						to={`/profile/${data?.username}?sec=timeline`}
						type='button'
						className={clsx(
							'title transition-all',
							query.get('sec') === 'timeline' && navLinkStyles
						)}
					>
						Timeline
					</Link>
					<Link
						to={`/profile/${data?.username}?sec=communities`}
						type='button'
						className={clsx(
							'title transition-all',
							query.get('sec') === 'communities' && navLinkStyles
						)}
					>
						Communities
					</Link>
					<Link
						to={`/profile/${data?.username}?sec=bookmarks`}
						type='button'
						className={clsx(
							'title transition-all',
							query.get('sec') === 'bookmarks' && navLinkStyles
						)}
					>
						Bookmarks
					</Link>
					<Link
						to={`/profile/${data?.username}?sec=photos`}
						type='button'
						className={clsx(
							'title transition-all',
							query.get('sec') === 'photos' && navLinkStyles
						)}
					>
						Photos
					</Link>
					<Link
						to={`/profile/${data?.username}?sec=videos`}
						type='button'
						className={clsx(
							'title transition-all',
							query.get('sec') === 'videos' && navLinkStyles
						)}
					>
						Videos
					</Link>
				</div>
				<Hr />
				{content}
			</div>
		</CenterLayout>
	);
};

export default UserProfile;
