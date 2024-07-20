/* eslint-disable no-mixed-spaces-and-tabs */
import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { Frown } from 'lucide-react';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import CreatePost from '../../../components/CreatePost';
import Post from '../../../components/Post/Post';
import PostPlaceholder from '../../../components/ui-placeholders/PostPlaceholder';
import {
	useGetCommunityQuery,
	useGetMembersQuery,
} from '../../../features/community/communityApi';
import {
	Community,
	GuestCommunityViewType,
} from '../../../features/community/types';
import {
	useGetCommunityPostsQuery,
	useLazyGetCommunityPostsQuery,
} from '../../../features/post/postApi';
import OutletLayout from '../../../layouts/OutletLayout';
import { trunc } from '../../../libs/helpers';

const Posts = () => {
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const params = useParams();
	const { data: communityData } = useGetCommunityQuery(params?.id || skipToken);
	const { data: membersData, isSuccess } = useGetMembersQuery({
		community_id: params.id ?? skipToken,
		limit: 5,
	});

	const {
		data,
		isLoading: isPostsLoading,
		// isSuccess: postsSuccess,
		isError,
	} = useGetCommunityPostsQuery({ community_id: params.id! });
	const [trigger, result] = useLazyGetCommunityPostsQuery();
	const location = useLocation();

	const postsData = result.data ?? data;
	// const postsIsSuccess = result.isSuccess || postsSuccess;

	const communityInfo = communityData as Community;

	const hasMore = result.data?.hasMore ?? postsData?.hasMore;

	const fetchNext = () => {
		if (hasMore) {
			trigger(
				{
					community_id: params.id! ?? skipToken,
					page: page + 1,
				},
				true
			);

			setPage((prev) => prev + 1);
		}
	};

	const fetchPrev = () => {
		if (page > 1) {
			trigger(
				{
					community_id: params.id! ?? skipToken,
					page: page - 1,
				},
				true
			);

			setPage((prev) => prev - 1);
		}
	};

	const handleInfoNavigation = () => {
		navigate(`/communities/${params.id}?sec=info`);
	};

	const postGridStyles =
		'grid grid-cols-2 gap-2 2xl:gap-20 px-0 2xl:px-20 mt-10';
	const basePostStyles = 'col-span-full md:col-span-1';
	const membersProfileStyles =
		'size-7 ms-1 border-2 dark:border-dark-muted rounded-full';

	return (
		<div className={postGridStyles}>
			<div className={basePostStyles}>
				{/* <div className='block md:hidden'> */}
				<div className='mb-8'>
					<CreatePost singleCommunity />
				</div>

				{isPostsLoading ? (
					<>
						<PostPlaceholder />
						<PostPlaceholder />
					</>
				) : (communityData as GuestCommunityViewType)?.message || isError ? (
					<h1 className='title flex flex-col items-center'>
						{' '}
						<Frown className='text-red size-14' /> You don't have access
					</h1>
				) : (
					<div className='flex flex-col gap-8'>
						{/* // TODO:  */}
						{postsData?.totalPendingPost ? (
							<Link
								to={`${location.pathname}/me/pending`}
								className='flex justify-between items-center w-full bg-dark-muted/20 p-3 rounded-lg'
							>
								<h1 className='title'>Pending Posts</h1>
								<div className='relative w-7 h-7 rounded-full ring-2 ring-blue-primary flex justify-center items-center'>
									<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
										<span className='title text-blue-primary'>
											{postsData?.totalPendingPost || 0}
										</span>
									</div>
								</div>
							</Link>
						) : null}

						{!postsData?.posts.length ? (
							<h1 className='title flex flex-col items-center'>
								{' '}
								<Frown className='text-red size-14' /> No Post Exist
							</h1>
						) : (
							postsData.posts.map((post) => (
								<Post key={post.post_id} post={post} />
							))
						)}

						<div className='flex justify-between items-center'>
							<Button
								onClick={fetchPrev}
								text='Prev'
								size='small'
								disabled={page === 1}
							/>
							<Button
								onClick={fetchNext}
								text='Next'
								size='small'
								disabled={!hasMore}
							/>
						</div>
					</div>
				)}
			</div>

			<div className='hidden md:block'>
				<OutletLayout title='About' sub='Developer Community'>
					<p
						className={clsx(
							'title',
							'text-sm',
							'font-normal',
							'font-Inter',
							'px-4'
						)}
					>
						{communityInfo?.description?.length > 200
							? trunc(communityInfo?.description, 200)
							: communityInfo?.description}
					</p>
					<div className='flex items-center gap-4 pl-5 pr-4 z-10'>
						<div className='flex items-center'>
							{/* <span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span> */}

							{isSuccess
								? membersData.members.map(({ member_id, user: { avatar } }) => (
										<LazyLoadImage
											key={member_id}
											src={avatar}
											className={membersProfileStyles}
											alt='Member profile image'
											effect='blur'
										/>
								  ))
								: null}

							<span
								className={clsx(
									'title',
									'text-sm',
									'font-normal',
									'text-light-primary/70',
									'pl-1'
								)}
							>
								{isSuccess
									? membersData.members.length - 5 > 0 &&
									  `+${membersData.members.length - 5}`
									: null}
							</span>
						</div>
					</div>
					<div className='flex items-center gap-5 px-4 my-5'>
						<Button
							text='Members'
							onClick={() => {
								navigate(`/communities/${params.id}?sec=members&filterBy=all`);
							}}
						/>
						<Button
							text='Info'
							onClick={handleInfoNavigation}
							className={clsx(
								'outlet_btn',
								'hover:opacity-70',
								'border-none',
								'px-12',
								'transition-all'
							)}
						/>
					</div>
				</OutletLayout>
			</div>
		</div>
	);
};

export default Posts;
