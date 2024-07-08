import { Frown } from 'lucide-react';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import Button from '../../../components/Buttons/Button';
import Post from '../../../components/Post/Post';
import PostPlaceholder from '../../../components/ui-placeholders/PostPlaceholder';
import { bookmarkApi } from '../../../features/bookmark/bookmarkApi';
import { BookmarkQueryResType } from '../../../features/bookmark/types';
import CenterLayout from '../../../layouts/CenterLayout';
import { StatusStateType } from '../../community/Community';

type Props = {
	scrollDivRef: React.RefObject<HTMLDivElement>;
};

const POSTS_PER_PAGE = 10;

const Bookmarks: FC<Props> = ({ scrollDivRef }) => {
	const params = useParams();
	// const { data, isLoading } = useGetBookmarksQuery(
	// 	params.username || skipToken
	// );

	// Pagination------------------
	const [page, setPage] = useState(1);
	const [bookmarksState, setBookmarksState] = useState<BookmarkQueryResType>({
		bookmarks: [],
		hasMore: false,
		totalCount: 0,
	});

	const [statusState, setStatusState] = useState<StatusStateType>({
		isError: false,
		isLoading: false,
	});
	const dispatch = useAppDispatch();
	const prevUsername = useRef<string>();

	const fetchMoreData = useCallback(
		async (pageNum: number = page) => {
			// console.log(params.username, 'username from fetchMoreData');
			try {
				setStatusState(() => ({
					isError: false,
					isLoading: true,
				}));

				const isEqualUsername = prevUsername.current === params.username;

				setPage((prev) => (isEqualUsername ? prev : 1));

				const { data, isSuccess } = await dispatch(
					bookmarkApi.endpoints.getBookmarks.initiate({
						username: params.username!,
						page: pageNum,
					})
				);

				if (isSuccess) {
					console.log(
						params.username,
						prevUsername,
						'username from fetchMoreData'
					);

					setBookmarksState((prevItems) => {
						console.log({ isEqualUsername });

						return {
							bookmarks: isEqualUsername
								? [...new Set([...prevItems.bookmarks, ...data.bookmarks])]
								: data.bookmarks,
							hasMore: data.hasMore,
							totalCount: data.totalCount,
						};
					});
				}

				prevUsername.current = params.username!;

				setStatusState((prev) => ({
					...prev,
					isLoading: false,
				}));
			} catch (error) {
				setStatusState((prev) => ({
					...prev,
					isError: true,
				}));
			}
		},
		[page, bookmarksState.hasMore, params.username]
	);

	useEffect(() => {
		if (!prevUsername.current) {
			prevUsername.current = params.username;
		}

		fetchMoreData(page);
	}, [page, params.username]);

	const fetchNext = () => {
		if (bookmarksState.hasMore) {
			setPage((prev) => prev + 1);

			if (scrollDivRef.current) {
				scrollDivRef.current.scrollTop = 0;
			}

			// navigate(`${location.pathname}/?sec=posts&page=${page + 1}`);
		}
	};

	const fetchPrev = () => {
		if (page > 1) {
			setPage((prev) => prev - 1);
			// navigate(`${location.pathname}/?sec=posts&page=${page + 1}`);
		}
	};

	const currentPageBookmarks: Post[] = useMemo(() => {
		const startIndex = (page - 1) * POSTS_PER_PAGE;
		const endIndex = startIndex + POSTS_PER_PAGE;
		return bookmarksState.bookmarks.slice(startIndex, endIndex);
	}, [bookmarksState]);

	// Pagination--------------

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='space-y-10'>
				{statusState.isLoading && (
					<>
						<PostPlaceholder />
						<PostPlaceholder />
					</>
				)}

				{!bookmarksState.bookmarks.length ? (
					<h1 className='title flex flex-col items-center'>
						{' '}
						<Frown className='text-red size-14' /> No Bookmark Exist
					</h1>
				) : (
					// currentPagePosts.map((post) => (
					// 	<Post post={post} key={post.post_id} />
					// ))
					currentPageBookmarks.map((post) => (
						<Post post={post} key={post.post_id} />
					))
				)}

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
						disabled={!bookmarksState.hasMore}
					/>
				</div>
			</div>
		</CenterLayout>
	);
};

export default Bookmarks;
