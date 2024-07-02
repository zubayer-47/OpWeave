import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	VariableSizeList as List,
	ListChildComponentProps,
} from 'react-window';
import { useAppDispatch } from '../../app/hooks';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post/Post';
import { postApi } from '../../features/post/postApi';

let phase = 0;

const Home = () => {
	const [postsState, setPostsState] = useState<{
		posts: Post[];
		totalCount: number;
	}>({ posts: [], totalCount: 0 });
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const listRef = useRef<List>(null);
	const dispatch = useAppDispatch();

	const hasMoree = useMemo(() => {
		console.log(postsState.posts.length, '---length');
		return Math.floor(postsState.totalCount / (page * 10)) === 0 &&
			postsState.totalCount === postsState.posts.length
			? false
			: true;
	}, [postsState.totalCount, page]);

	console.log(hasMoree, Math.floor(postsState.totalCount / (page * 10)), {
		page,
	});

	const fetchMoreData = useCallback(async () => {
		console.log('rendering fetchMoreData');
		const { data, isSuccess } = await dispatch(
			postApi.endpoints.getFeedPosts.initiate(page)
		);

		if (data?.posts.length === 0) {
			// setHasMore(false);
		} else {
			if (isSuccess) {
				setPostsState((prevItems) => ({
					totalCount: data.totalCount,
					posts: [...new Set([...prevItems.posts, ...data.posts])],
				}));

				setPage((prev) => prev + 1);
			}
		}
	}, [page, hasMore]);

	useEffect(() => {
		phase += 1;

		console.log('effect rendering');
		if (phase > 1) fetchMoreData();
	}, []);

	const renderRow = ({ index, style }: ListChildComponentProps) => {
		const item = postsState.posts[index];

		return (
			<div className='my-7'>
				{item ? <Post post={item} /> : <h1 className=''>Loading...</h1>}
			</div>
		);
	};

	const getItemSize = (index: number) => 300;

	return (
		<div className='flex flex-col gap-5'>
			<CreatePost />

			<InfiniteScroll
				dataLength={postsState.posts.length}
				next={fetchMoreData}
				hasMore={hasMoree}
				loader={hasMoree ? <h4 className='text-red'>Loading...</h4> : null}
				scrollableTarget='scrollableDiv'
			>
				<List
					className='scrollbar-none'
					ref={listRef}
					height={postsState.posts.length * 500} // Adjust dynamically based on item size
					itemCount={postsState.posts.length}
					itemSize={getItemSize}
					width='100%'
				>
					{renderRow}
				</List>
			</InfiniteScroll>
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
