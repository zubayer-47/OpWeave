import { Frown } from 'lucide-react';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';
import PostPlaceholder from '../../components/ui-placeholders/PostPlaceholder';
import { useGetFeedPostsQuery } from '../../features/post/postApi';

const Home = () => {
	const { data, isLoading } = useGetFeedPostsQuery();

	return (
		<div className='py-10 space-y-10'>
			<CreatePost />

			{isLoading ? (
				<>
					<PostPlaceholder />
					<PostPlaceholder />
				</>
			) : (
				<>
					{!data?.posts.length ? (
						<h1 className='title flex flex-col items-center'>
							{' '}
							<Frown className='text-red size-14' /> No Post Exist
						</h1>
					) : (
						data.posts.map((post) => <Post key={post.post_id} post={post} />)
					)}
				</>
			)}
		</div>
	);
};

export default Home;
