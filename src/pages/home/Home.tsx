import { TouchEventHandler, useRef, useState } from 'react';
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
	const scrollDivRef = useRef<HTMLDivElement>(null);
	// const isSuccess = result.isSuccess || postsSuccess;

	const hasMore = result.data?.hasMore ?? data?.hasMore;

	const [pullChange, setPullChange] = useState(0);

	const initializeLoading = () => {
		setTimeout(() => {
			window.location.reload();
		}, 300);
	};

	const pull: TouchEventHandler<HTMLDivElement> = (e) => {
		const touch = e.targetTouches[0];

		let { clientY } = touch;

		let pullLength = Math.abs(clientY) || 0;
		// console.log({ pullLength });
		setPullChange(pullLength);

		if (pullLength > 200) initializeLoading();
	};

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

	// console.log({ pullChange });

	return (
		<div
			className='flex flex-col gap-8 px-2 pb-4 lg:px-10 xl:px-28 h-full overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
			ref={scrollDivRef}
			onTouchMove={pull}
			style={{
				marginTop: pullChange ? `${pullChange / 4}px` : '-2rem',
			}}
		>
			<div
				className='w-full flex justify-center -mb-5'
				// style={{
				// 	marginTop: `${pullChange / 4}px`,
				// }}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={2.5}
					stroke='currentColor'
					className='w-6 h-6 bg-gray-700 text-blue-primary rounded-full p-0.5'
					style={{ transform: `rotate(${pullChange}deg)` }}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
					/>
				</svg>
			</div>

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
