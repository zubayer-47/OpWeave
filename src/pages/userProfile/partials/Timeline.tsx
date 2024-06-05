import CreatePost from '../../../components/CreatePost';
import Post from '../../../components/Post';
import PostPlaceholder from '../../../components/ui-placeholders/PostPlaceholder';
import { useGetUserPostsQuery } from '../../../features/post/postApi';
import CenterLayout from '../../../layouts/CenterLayout';

const Timeline = () => {
	const { data, isSuccess, isLoading } = useGetUserPostsQuery();

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='space-y-10'>
				<CreatePost />

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
