import { useRef, useState } from 'react';
// import { FixedSizeList } from 'react-window';
import Button from '../../components/Buttons/Button';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post/Post';
import PostPlaceholder from '../../components/ui-placeholders/PostPlaceholder';
import {
	useGetFeedPostsQuery,
	useLazyGetFeedPostsQuery,
} from '../../features/post/postApi';

const Home = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetFeedPostsQuery();
	const [trigger, result] = useLazyGetFeedPostsQuery();

	const postsData = result.data ?? data;
	// const isSuccess = result.isSuccess || postsSuccess;

	const hasMore = result.data?.hasMore ?? data?.hasMore;

	const scrollDivRef = useRef<HTMLDivElement>(null);

	const fetchNext = () => {
		if (hasMore) {
			trigger(page + 1, true);

			setPage((prev) => prev + 1);

			if (scrollDivRef.current) {
				scrollDivRef.current.scrollTop = 0;
			}
		}
	};

	const fetchPrev = () => {
		if (page > 1) {
			trigger(page - 1, true);

			setPage((prev) => prev - 1);
		}
	};

	return (
		<div
			className='flex flex-col gap-8 px-2 lg:px-10 xl:px-28 h-full overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
			ref={scrollDivRef}
		>
			<CreatePost />

			{hasMore && (isLoading || result.isLoading) && (
				// <Loader className='size-8 text-dark-muted animate-spin w-full' />
				<>
					<PostPlaceholder />
					<PostPlaceholder />
				</>
			)}

			{postsData?.posts.map((post) => (
				<Post key={post.post_id} post={post} />
			))}

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
	);
};

export default Home;
