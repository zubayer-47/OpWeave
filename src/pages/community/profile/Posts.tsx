import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { Frown } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Button from '../../../components/Buttons/Button';
import CreatePost from '../../../components/CreatePost';
import Post from '../../../components/Post';
import { useGetCommunityQuery } from '../../../features/community/communityApi';
import { updateModal } from '../../../features/modal/modalSlice';
import { useGetCommunityPostsQuery } from '../../../features/post/postApi';
import ModalLayout from '../../../layouts/ModalLayouts/ModalLayout';
import OutletLayout from '../../../layouts/OutletLayout';
import { trunc } from '../../../libs/helpers';

const Posts = () => {
	const params = useParams();
	const { data, isLoading, isError } = useGetCommunityPostsQuery(
		params.id ?? skipToken
	);
	const { data: communityData } = useGetCommunityQuery(params?.id || skipToken);

	const dispatch = useAppDispatch();
	const isVisibleModal = useAppSelector((state) => state.modal.isVisibleModal);

	if (isLoading) {
		// TODO: 8/5 add a placeholder loading UI
		return <h1 className='text-2xl text-light-lighter'>Loading...</h1>;
	} else if (isError) {
		// TODO: 8/5 add a placeholder error UI
		return <h1 className='text-2xl text-red'>Something is wrong</h1>;
	}

	const postGridStyles = 'grid grid-cols-2 gap-20 px-20 mt-10';
	const basePostStyles = 'flex flex-col gap-10';
	const membersProfileStyles =
		'size-7 bg-dark-primary -ml-1 border dark:border-dark-border rounded-full';

	return (
		<div className={postGridStyles}>
			<div className={basePostStyles}>
				{/* <Post />
				<Post /> */}

				{!data?.posts.length ? (
					<h1 className='title flex flex-col items-center'>
						{' '}
						<Frown className='text-red size-14' /> No Post Exist
					</h1>
				) : (
					data.posts.map(
						({
							post_id,
							body,
							image_url,
							community: { name },
							member: {
								user: { avatar, fullname, username },
							},
						}) => (
							<Post
								key={post_id}
								avatar={avatar}
								body={body}
								community_name={name}
								fullname={fullname}
								username={username}
								image_url={image_url}
								// El={body}
							/>
						)
					)
				)}
			</div>

			<div>
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
						{communityData && communityData.description.length > 200
							? trunc(communityData?.description, 200)
							: communityData?.description}
					</p>
					<div className='flex items-center gap-4 pl-5 pr-4 z-10'>
						<div className='flex items-center'>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span
								className={clsx(
									'title',
									'text-sm',
									'font-normal',
									'text-light-primary/70',
									'pl-1'
								)}
							>
								+200
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
						/>
						<Button
							text='Info'
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
