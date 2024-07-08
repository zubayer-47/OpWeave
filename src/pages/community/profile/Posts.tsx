/* eslint-disable no-mixed-spaces-and-tabs */
import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { Frown } from 'lucide-react';
import { FC } from 'react';
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
import type { Post as PostType } from '../../../features/post/types';
import OutletLayout from '../../../layouts/OutletLayout';
import { trunc } from '../../../libs/helpers';

type Props = {
	// statusState: StatusStateType;
	// postsState: CommunityPostsResType;
	// currentPagePosts: PostType[];

	page: number;
	posts: PostType[];
	totalPendingPost: number;
	hasMore: boolean;
	isLoading: boolean;
	isError: boolean;
	fetchNext: () => void;
	fetchPrev: () => void;
};

const Posts: FC<Props> = ({
	// page,
	// currentPagePosts,
	// postsState,
	// statusState,
	// fetchNext,
	// fetchPrev,
	page,
	posts,
	isLoading,
	isError,
	totalPendingPost,
	hasMore,
	fetchNext,
	fetchPrev,
}) => {
	const navigate = useNavigate();

	const params = useParams();
	const { data } = useGetCommunityQuery(params?.id || skipToken);
	const { data: membersData, isSuccess } = useGetMembersQuery({
		community_id: params.id ?? skipToken,
	});

	// const memberId = (data as Community)?.member_id;
	// const isFetchPosts = !!(typeof memberId === 'string');

	// const {
	// 	data: communityPostsData,
	// isLoading,
	// 	isError,
	// } = useGetCommunityPostsQuery(isFetchPosts ? params.id! : skipToken);
	const location = useLocation();

	const communityData = data as Community;

	// if (isError) {
	// 	// TODO: 8/5 add a placeholder error UI
	// 	return <h1 className='text-2xl text-red'>Something is wrong</h1>;
	// }

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

				{isLoading ? (
					<>
						<PostPlaceholder />
						<PostPlaceholder />
					</>
				) : (data as GuestCommunityViewType)?.message || isError ? (
					<h1 className='title flex flex-col items-center'>
						{' '}
						<Frown className='text-red size-14' /> You don't have access
					</h1>
				) : (
					<div className='flex flex-col gap-8'>
						{totalPendingPost ? (
							<Link
								to={`${location.pathname}/me/pending`}
								className='flex justify-between items-center w-full bg-dark-muted/20 p-3 rounded-lg'
							>
								<h1 className='title'>Pending Posts</h1>
								<div className='relative w-7 h-7 rounded-full ring-2 ring-blue-primary flex justify-center items-center'>
									<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
										<span className='title text-blue-primary'>
											{totalPendingPost || 0}
										</span>
									</div>
								</div>
							</Link>
						) : null}

						{!posts.length ? (
							<h1 className='title flex flex-col items-center'>
								{' '}
								<Frown className='text-red size-14' /> No Post Exist
							</h1>
						) : (
							posts.map((post) => <Post key={post.post_id} post={post} />)
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
						{communityData?.description?.length > 200
							? trunc(communityData?.description, 200)
							: communityData?.description}
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
								? membersData.members
										.slice(0, 5)
										.map(({ member_id, user: { avatar } }) => (
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
