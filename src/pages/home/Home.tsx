import { Frown } from 'lucide-react';
import { useState } from 'react';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post/Post';
import PostPlaceholder from '../../components/ui-placeholders/PostPlaceholder';
import { useGetFeedPostsQuery } from '../../features/post/postApi';

const Home = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading, refetch } = useGetFeedPostsQuery({});
	const hasMore = data?.posts.length;

	const loadMoreItems = async () => {
		if (isLoading || !hasMore) return;

		// setLoading(true);
		try {
			// const data = await postApi.endpoints.getFeedPosts.initiate({page: })
			// setItems((prevItems) => [...prevItems, ...data]);
			// setPage((prevPage) => prevPage + 1);
			// setHasMore(data.length > 0);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

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
