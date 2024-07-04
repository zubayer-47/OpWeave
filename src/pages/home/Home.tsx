import { Loader } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post/Post';
import { postApi } from '../../features/post/postApi';

let phase = 0;
const ITEM_HEIGHT = 550;
const BUFFER_SIZE = 13;

export type PostStateType = {
	posts: Post[];
	hasMore: boolean;
};

const Home = () => {
	const [postsState, setPostsState] = useState<PostStateType>({
		posts: [],
		hasMore: false,
	});
	const [visibleItems, setVisibleItems] = useState<Post[]>([]);

	const [isLoading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	// const { data, isSuccess } = useGetFeedPostsQuery();

	// const { page, lastElementRef, scrollContainerRef } = useInfiniteScroll({
	// 	hasMore: postsState.hasMore,
	// });
	// const observer = useRef<IntersectionObserver | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const dispatch = useAppDispatch();

	// const lastElementRef = useCallback(
	// 	(node: HTMLDivElement) => {
	// 		if (isLoading) return;
	// 		if (observer.current) observer.current.disconnect();
	// 		observer.current = new IntersectionObserver((entries) => {
	// 			if (entries[0].isIntersecting && postsState.hasMore) {
	// 				setPage((prevPage) => prevPage + 1);
	// 			}
	// 		});
	// 		if (node) observer.current.observe(node);
	// 	},
	// 	[isLoading, postsState.hasMore]
	// );

	const fetchMoreData = useCallback(async () => {
		try {
			setLoading(true);

			const { data, isSuccess } = await dispatch(
				postApi.endpoints.getFeedPosts.initiate(page)
			);

			if (data?.posts.length === 0) {
				// setHasMore(false);
			} else {
				if (isSuccess) {
					setPostsState((prevItems) => ({
						hasMore: data.hasMore,
						// posts: [...prevItems.posts, ...data.posts],
						posts: [...new Set([...prevItems.posts, ...data.posts])],
					}));

					setPage((prev) => prev + 1);
				}
			}
			setLoading(false);
		} catch (error) {
			//
		}
	}, [page, postsState.hasMore]);

	useEffect(() => {
		phase += 1;

		if (phase > 1) {
			fetchMoreData();
		}
	}, []);

	const updateVisibleItems = () => {
		if (!containerRef.current) return;

		const scrollTop = containerRef.current.scrollTop;
		const startIndex = Math.max(0, postsState.posts.length - page * 10);

		const endIndex = Math.min(
			postsState.posts.length,
			Math.ceil(scrollTop / ITEM_HEIGHT) + BUFFER_SIZE * 2
		);

		console.log(
			startIndex,
			endIndex,
			'---hs',
			postsState.posts.length - (page - 1) * 10
		);
		setVisibleItems(postsState.posts.slice(startIndex, endIndex));
	};

	useEffect(() => {
		updateVisibleItems();
	}, [postsState.posts]);

	// const renderRow = ({ index, style }: ListChildComponentProps) => {
	// 	const item = postsState.posts[index];

	// 	return (
	// 		<div className='my-7'>
	// 			{item ? <Post post={item} /> : <h1 className=''>Loading...</h1>}
	// 		</div>
	// 	);
	// };
	const handleScroll = () => {
		updateVisibleItems();

		if (containerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
			if (
				scrollTop + clientHeight >= scrollHeight - ITEM_HEIGHT &&
				postsState.hasMore &&
				!isLoading
			) {
				fetchMoreData();
			}
		}
	};

	// useEffect(() => {
	// 	console.log(window.innerHeight);
	// }, []);

	return (
		<div
			className='flex flex-col gap-8 px-2 lg:px-10 xl:px-28 bg-rose-400 h-full overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
			id='scrollableDiv'
			ref={containerRef}
			onScroll={handleScroll}
		>
			<CreatePost />

			{/* <InfiniteScroll
				dataLength={postsState.posts.length}
				next={fetchMoreData}
				hasMore={postsState.hasMore}
				loader={
					postsState.hasMore ? (
						<Loader className='size-8 text-dark-muted animate-spin w-full' />
					) : null
				}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b className='text-dark-muted'>Yay! You have seen it all</b>
					</p>
				}
				scrollableTarget='scrollableDiv'
				className='flex flex-col gap-8'
				// scrollThreshold='10px'
			> */}
			{visibleItems.map((post) => {
				return (
					<Post
						key={post.post_id}
						// ref={ind === postsState.posts.length - 1 ? lastElementRef : null}
						post={post}
					/>
				);
			})}
			{/* </InfiniteScroll> */}

			{postsState.hasMore && isLoading && (
				<Loader className='size-8 text-dark-muted animate-spin w-full' />
			)}

			{/* <InfiniteScroll
				dataLength={postsState.posts.length}
				next={fetchMoreData}
				hasMore={hasMore}
				loader={
					hasMore ? (
						<Loader className='size-8 text-dark-muted animate-spin w-full' />
					) : null
				}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b className='text-dark-muted'>Yay! You have seen it all</b>
					</p>
				}
				scrollableTarget='scrollableDiv'
				className='flex flex-col gap-8 h-full'
				scrollThreshold='10px'
			>
				{postsState.posts.map((post) => (
					<Post key={post.post_id} post={post} />
				))}
			</InfiniteScroll> */}
		</div>
	);
};

export default Home;

// const Home = () => {
// 	const [page, setPage] = useState(1);
// 	const limit = 10;
// 	const { data, isSuccess } = useGetFeedPostsQuery(page);
// 	// const dispatch = useAppDispatch();
// 	// const hasMore = data?.totalCount
// 	// 	? Math.floor(data.totalCount / (page * limit))
// 	// 	: 0;

// 	function rowRenderer({
// 		// key, // Unique key within array of rows
// 		index, // Index of row within collection
// 		// isScrolling, // The List is currently being scrolled
// 		// isVisible, // This row is visible within the List (eg it is not an overscanned row)
// 		style, // Style object to be applied to row (to position it)
// 	}) {
// 		return (
// 			<div key={key} style={style}>
// 				{data?.posts.length ? <Post post={data.posts[index]} /> : null}
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className='py-10 space-y-10'>
// 			<CreatePost />

// 			{/* <button
// 				type='button'
// 				className='size-20 text-white'
// 				onClick={() => setPage((prev) => prev + 1)}
// 			>
// 				click
// 			</button> */}

// 			{isSuccess ? (
// 				<List
// 					width={300}
// 					height={300}
// 					autoHeight
// 					rowCount={data.posts.length}
// 					rowHeight={20}
// 					rowRenderer={rowRenderer}
// 				/>
// 			) : null}

// 			{/* {isLoading ? (
// 				<>
// 					<PostPlaceholder />
// 					<PostPlaceholder />
// 				</>
// 			) : (
// 				isSuccess && (
// 					<>
// 						<List
// 							height={400}
// 							itemCount={hasMore ? data.posts.length + 1 : data.posts.length}
// 							itemSize={35}
// 							width='100%'
// 							onItemsRendered={({ visibleStopIndex }) => {
// 								if (visibleStopIndex + 1 === data.posts.length) {
// 									loadMoreItems();
// 								}
// 							}}
// 						>
// 							{Row}
// 						</List> */}
// 			{/* {!data?.posts.length ? (
// 						<h1 className='title flex flex-col items-center'>
// 							{' '}
// 							<Frown className='text-red size-14' /> No Post Exist
// 						</h1>
// 					) : (
// 						data.posts.map((post) => <Post key={post.post_id} post={post} />)
// 					)} */}
// 			{/* </>
// 				)
// 			)} */}
// 		</div>
// 	);
// };

// export default Home;
