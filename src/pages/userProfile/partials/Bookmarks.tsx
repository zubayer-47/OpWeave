import { skipToken } from '@reduxjs/toolkit/query';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookmarksQuery } from '../../../features/bookmark/bookmarkApi';
import CenterLayout from '../../../layouts/CenterLayout';
import PostPlaceholder from '../../../components/ui-placeholders/PostPlaceholder';
import { Frown } from 'lucide-react';
import Post from '../../../components/Post/Post';

type Props = {
	scrollDivRef: React.RefObject<HTMLDivElement>;
};

const Bookmarks: FC<Props> = () => {
	const params = useParams();
	const { data, isLoading } = useGetBookmarksQuery(params.username || skipToken);

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='space-y-10'>

				{isLoading && (
					<>
						<PostPlaceholder />
						<PostPlaceholder />
					</>
				)}

				{!data?.bookmarks.length ? (
					<h1 className='title flex flex-col items-center'>
						{' '}
						<Frown className='text-red size-14' /> No Bookmark Exist
					</h1>
				) : (
					// currentPagePosts.map((post) => (
					// 	<Post post={post} key={post.post_id} />
					// ))
					data.bookmarks.map(({post}) => (
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
						disabled={!postsState.hasMore}
					/>
				</div>
			</div>
		</CenterLayou>
	);
};

export default Bookmarks;
