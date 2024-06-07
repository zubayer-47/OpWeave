/* eslint-disable no-mixed-spaces-and-tabs */
import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { Frown } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Button from '../../../components/Buttons/Button';
import CreatePost from '../../../components/CreatePost';
import Post from '../../../components/Post';
import PostPlaceholder from '../../../components/ui-placeholders/PostPlaceholder';
import {
	useGetCommunityQuery,
	useGetMembersQuery,
} from '../../../features/community/communityApi';
import {
	Community,
	GuestCommunityViewType,
} from '../../../features/community/types';
import { updateModal } from '../../../features/modal/modalSlice';
import { useGetCommunityPostsQuery } from '../../../features/post/postApi';
import ModalLayout from '../../../layouts/ModalLayouts/ModalLayout';
import OutletLayout from '../../../layouts/OutletLayout';
import { trunc } from '../../../libs/helpers';

const Posts = () => {
	const params = useParams();
	const { data } = useGetCommunityQuery(params?.id || skipToken);
	const {
		data: communityPostsData,
		isLoading,
		isError,
	} = useGetCommunityPostsQuery(params.id ?? skipToken, {
		skip: !!(data as GuestCommunityViewType)?.message,
	});
	const { data: membersData, isSuccess } = useGetMembersQuery(
		params.id ?? skipToken
	);
	const isVisibleModal = useAppSelector((state) => state.modal.isVisibleModal);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const communityData = data as Community;

	if (isError) {
		// TODO: 8/5 add a placeholder error UI
		return <h1 className='text-2xl text-red'>Something is wrong</h1>;
	}

	const handleInfoNavigation = () => {
		navigate(`/communities/${params.id}?sec=info`);
	};

	const postGridStyles =
		'grid grid-cols-2 gap-2 2xl:gap-20 px-0 2xl:px-20 mt-10';
	const basePostStyles = 'col-span-full md:col-span-1 flex flex-col gap-10';
	const membersProfileStyles =
		'size-7 -ml-1 border-2 dark:border-dark-muted rounded-full';

	return (
		<div className={postGridStyles}>
			<div className={basePostStyles}>
				<div className='block md:hidden'>
					<CreatePost />
				</div>

				{isLoading ? (
					<>
						<PostPlaceholder />
						<PostPlaceholder />
					</>
				) : (data as GuestCommunityViewType)?.message ? (
					<h1 className='title flex flex-col items-center'>
						{' '}
						<Frown className='text-red size-14' /> You don't have access
					</h1>
				) : (
					<>
						{!communityPostsData?.posts.length ? (
							<h1 className='title flex flex-col items-center'>
								{' '}
								<Frown className='text-red size-14' /> No Post Exist
							</h1>
						) : (
							communityPostsData.posts.map((post) => (
								<Post key={post.post_id} post={post} />
							))
						)}
					</>
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
											<img
												key={member_id}
												src={avatar}
												className={membersProfileStyles}
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
						<Link
							to={`/communities/${params.id}?sec=members`}
							className={clsx(
								'text-blue-primary',
								'underline',
								'underline-offset-2',
								'font-Poppins',
								'text-sm'
							)}
						>
							Members
						</Link>
					</div>
					<div className='flex items-center gap-5 px-4 my-5'>
						<Button
							text='Create Post'
							onClick={() => dispatch(updateModal())}
							disabled={!!(data as GuestCommunityViewType)?.message}
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
			<ModalLayout
				heading='Create Post'
				isOpen={isVisibleModal}
				onClose={() => dispatch(updateModal())}
				size='2xl'
			>
				<CreatePost singleCommunity />
			</ModalLayout>
		</div>
	);
};

export default Posts;
