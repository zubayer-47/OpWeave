import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '../../../app/hooks';
import CreatePost from '../../../components/CreatePost';
import Post from '../../../components/Post';
import { useGetUserPostsQuery } from '../../../features/post/postApi';
import CenterLayout from '../../../layouts/CenterLayout';

const Timeline = () => {
	const userId = useAppSelector((state) => state.auth.user?.id);
	const { data, isSuccess, isLoading } = useGetUserPostsQuery(
		userId || skipToken
	);

	if (isLoading) return <h1 className='title text-2xl'>Loading...</h1>;

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='space-y-10'>
				<CreatePost />

				{isSuccess &&
					data.posts.map((post) => <Post post={post} key={post.post_id} />)}
			</div>
		</CenterLayout>
	);
};

export default Timeline;
