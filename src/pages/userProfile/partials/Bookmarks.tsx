import { Frown } from 'lucide-react';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import Post from '../../../components/Post/Post';
import PostPlaceholder from '../../../components/ui-placeholders/PostPlaceholder';
import {
	useGetBookmarksQuery,
	useLazyGetBookmarksQuery,
} from '../../../features/bookmark/bookmarkApi';
import CenterLayout from '../../../layouts/CenterLayout';

type Props = {
	scrollDivRef: React.RefObject<HTMLDivElement>;
};

const Bookmarks: FC<Props> = ({ scrollDivRef }) => {
	const params = useParams();
	const username = params.username!;
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetBookmarksQuery({
		username,
	});
	const [trigger, result] = useLazyGetBookmarksQuery();

	const hasMore = result.data?.hasMore ?? data?.hasMore;

	const fetchNext = () => {
		if (hasMore) {
			trigger({ username, page: page + 1 }, true);

			setPage((prev) => prev + 1);

			if (scrollDivRef.current) {
				scrollDivRef.current.scrollTop = 0;
			}
		}
	};

	const fetchPrev = () => {
		if (page > 1) {
			trigger({ username, page: page - 1 }, true);

			setPage((prev) => prev - 1);
		}
	};

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='space-y-10'>
				{hasMore && (isLoading || result.isLoading) && (
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
					data.bookmarks.map((post) => <Post post={post} key={post.post_id} />)
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
						disabled={!hasMore}
					/>
				</div>
			</div>
		</CenterLayout>
	);
};

export default Bookmarks;
