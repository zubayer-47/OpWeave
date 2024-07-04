import { Loader } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { FixedSizeList } from 'react-window';
import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/Buttons/Button';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post/Post';
import { postApi } from '../../features/post/postApi';
import { PostStateType } from '../../types/custom';

const POSTS_PER_PAGE = 10;

const Home = () => {
	const [postsState, setPostsState] = useState<PostStateType>({
		posts: [],
		hasMore: false,
		totalCount: 0,
	});
	const [isLoading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const dispatch = useAppDispatch();
	// const navigate = useNavigate();

	const scrollDivRef = useRef<HTMLDivElement>(null);

	const fetchMoreData = useCallback(
		async (pageNum: number = page) => {
			try {
				setLoading(true);

				const { data, isSuccess } = await dispatch(
					postApi.endpoints.getFeedPosts.initiate(pageNum)
				);

				if (data?.posts.length === 0) {
					// setHasMore(false);
				} else {
					if (isSuccess) {
						setPostsState((prevItems) => ({
							hasMore: data.hasMore,
							totalCount: data.totalCount,
							// posts: [...prevItems.posts, ...data.posts],
							posts: [...new Set([...prevItems.posts, ...data.posts])],
						}));
					}
				}
				setLoading(false);
			} catch (error) {
				//
			}
		},
		[page, postsState.hasMore]
	);

	useEffect(() => {
		fetchMoreData(page);
	}, [page]);

	const fetchNext = () => {
		if (postsState.hasMore) {
			setPage((prev) => prev + 1);

			if (scrollDivRef.current) {
				scrollDivRef.current.scrollTop = 0;
			}

			// navigate(`/?page=${page + 1}`);
		}
	};

	const fetchPrev = () => {
		if (page > 1) {
			setPage((prev) => prev - 1);
			// navigate(`/?page=${page - 1}`);
		}
	};

	const currentPagePosts: Post[] = useMemo(() => {
		const startIndex = (page - 1) * POSTS_PER_PAGE;
		const endIndex = startIndex + POSTS_PER_PAGE;
		return postsState.posts.slice(startIndex, endIndex);
	}, [postsState]);

	console.log(currentPagePosts);

	return (
		<div
			className='flex flex-col gap-8 px-2 lg:px-10 xl:px-28 h-full overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
			ref={scrollDivRef}
		>
			<CreatePost />

			{postsState.hasMore && isLoading && (
				<Loader className='size-8 text-dark-muted animate-spin w-full' />
			)}

			{currentPagePosts.map((post) => (
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
					disabled={!postsState.hasMore}
				/>
			</div>
		</div>
	);
};

export default Home;
