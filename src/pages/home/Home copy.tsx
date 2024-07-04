import { useCallback, useEffect, useRef, useState } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { useAppDispatch } from '../../app/hooks';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post/Post';
import { postApi } from '../../features/post/postApi';
import { PostStateType } from './Home';

const HomeCp = () => {
	const [postsState, setPostsState] = useState<PostStateType>({
		posts: [],
		hasMore: false,
	});

	const [isLoading, setLoading] = useState(false);

	const [page, setPage] = useState(1);
	const dispatch = useAppDispatch();
	const listRef = useRef<HTMLDivElement>(null);
	const observer = useRef<IntersectionObserver>();

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
				}
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			//
		}
	}, [page, postsState.hasMore]);

	useEffect(() => {
		fetchMoreData();
	}, []);

	const lastElementRef = useCallback(
		(node: HTMLDivElement) => {
			// if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && postsState.hasMore) {
					setPage((prevPage) => prevPage + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, postsState.hasMore]
	);

	// const handleScroll = () => {
	// 	if (listRef.current) {
	// 		const { scrollTop, scrollHeight, clientHeight } = listRef.current;
	// 		if (
	// 			scrollTop + clientHeight >= scrollHeight - 500 &&
	// 			postsState.hasMore
	// 		) {
	// 			fetchMoreData();
	// 		}
	// 	}
	// };

	function rowRenderer({
		index, // Index of row within collection
		// isScrolling, // The List is currently being scrolled
		// isVisible, // This row is visible within the List (eg it is not an overscanned row)
		style, // Style object to be applied to row (to position it)
	}: ListChildComponentProps) {
		return (
			<div style={style} ref={listRef}>
				<CreatePost />
				{postsState.posts.length ? (
					<Post
						ref={postsState.posts.length - 1 === index ? lastElementRef : null}
						post={postsState.posts[index]}
					/>
				) : null}
			</div>
		);
	}

	return (
		<div
			className='flex flex-col gap-8 px-2 lg:px-10 xl:px-28'
			id='scrollableDiv'
		>
			<List
				width='100%'
				height={window.innerHeight}
				itemCount={postsState.posts.length}
				itemSize={500}
			>
				{rowRenderer}
			</List>
			{/* {isLoading ? (
				<>
					<PostPlaceholder />
					<PostPlaceholder />
				</>
			) : (
				isSuccess && (
					<>
						<List
							height={400}
							itemCount={hasMore ? data.posts.length + 1 : data.posts.length}
							itemSize={35}
							width='100%'
							onItemsRendered={({ visibleStopIndex }) => {
								if (visibleStopIndex + 1 === data.posts.length) {
									loadMoreItems();
								}
							}}
						>
							{Row}
						</List> */}
			{/* {!data?.posts.length ? (
						<h1 className='title flex flex-col items-center'>
							{' '}
							<Frown className='text-red size-14' /> No Post Exist
						</h1>
					) : (
						data.posts.map((post) => <Post key={post.post_id} post={post} />)
					)} */}
			{/* </>
				)
			)} */}
		</div>
	);
};

export default HomeCp;
