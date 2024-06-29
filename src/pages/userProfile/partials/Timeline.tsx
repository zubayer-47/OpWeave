import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import CreatePost from '../../../components/CreatePost';
import Post from '../../../components/Post/Post';
import PostPlaceholder from '../../../components/ui-placeholders/PostPlaceholder';
import { useGetUserPostsQuery } from '../../../features/post/postApi';
import CenterLayout from '../../../layouts/CenterLayout';

const Timeline = () => {
	const params = useParams();
	const { data, isSuccess, isLoading } = useGetUserPostsQuery(
		params.username! || skipToken
	);
	const username = useAppSelector((state) => state.auth.user?.username);

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='space-y-10'>
				{username === params.username! ? <CreatePost /> : null}

				{isLoading ? (
					<>
						<PostPlaceholder />
						<PostPlaceholder />
					</>
				) : (
					<>
						{isSuccess &&
							data.posts.map((post) => <Post post={post} key={post.post_id} />)}
					</>
				)}
			</div>
		</CenterLayout>
	);
};

export default Timeline;
