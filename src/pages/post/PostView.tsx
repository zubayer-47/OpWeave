import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import Post from '../../components/Post/Post';
import PostPlaceholder from '../../components/ui-placeholders/PostPlaceholder';
import { useGetPostQuery } from '../../features/post/postApi';
import CenterLayout from '../../layouts/CenterLayout';

const PostView = () => {
	const params = useParams();
	const { data, isLoading, isSuccess, isError } = useGetPostQuery(
		params?.postId || skipToken
	);

	if (isError)
		return <h1 className='title text-red text-2xl'>Something is wrong</h1>;

	return (
		isSuccess && (
			<CenterLayout
				hasNav
				className='w-full height_without_nav py-5 overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary px-2'
			>
				<div
					className={clsx(
						'py-10 max-w-102 mx-auto'
						// 'w-full height_without_nav py-5 overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary px-3'
					)}
				>
					{isLoading ? <PostPlaceholder /> : <Post post={data} />}
				</div>
			</CenterLayout>
		)
	);
};

export default PostView;
