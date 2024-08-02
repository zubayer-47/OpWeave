import clsx from 'clsx';
import { BookmarkIcon } from 'lucide-react';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import {
	useAddToBookmarkMutation,
	useDeleteBookmarkMutation,
} from '../../../features/bookmark/bookmarkApi';

type Props = {
	bookmark_id: string;
	post_id: string;
};

const Bookmark: FC<Props> = ({ bookmark_id, post_id }) => {
	const [bookmarked, setBookmarked] = useState(!!bookmark_id);
	const [addToBookmark] = useAddToBookmarkMutation();
	const [deleteBookmark] = useDeleteBookmarkMutation();

	// console.log({ bookmark_id });

	const toggleBookmark = async () => {
		setBookmarked((prev) => !prev);

		try {
			console.log(!bookmark_id, bookmark_id);
			if (!bookmark_id) {
				const res = await addToBookmark(post_id);

				if ('error' in res) {
					setBookmarked((prev) => !prev);

					// eslint-disable-next-line no-unsafe-optional-chaining
					if ('status' in res.error!) {
						toast.error(`${res.error.data}`);
					}

					return;
				}

				toast.success('Bookmark added');
				return;
			}

			const res = await deleteBookmark(bookmark_id);
			console.log(res);

			if ('error' in res) {
				setBookmarked((prev) => !prev);
				if ('status' in res.error!) {
					toast.error(`${res.error.data}`);
				}

				return;
			}

			toast.success('Bookmark deleted');
		} catch (error) {
			// toast.error('Bookmark action fail');
		}
	};

	return (
		<button
			type='button'
			className={clsx('bg-dark-border rounded-full px-2.5 py-1', {
				'!bg-blue-primary/30': bookmarked,
			})}
			onClick={toggleBookmark}
		>
			<BookmarkIcon
				className={clsx('size-6 text-light-muted dark:text-dark-muted', {
					'fill-blue-primary stroke-blue-primary': bookmarked,
				})}
			/>
		</button>
	);
};

export default Bookmark;
