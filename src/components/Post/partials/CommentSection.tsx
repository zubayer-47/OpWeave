import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { CornerDownLeft } from 'lucide-react';
import { FC, lazy } from 'react';
import toast from 'react-hot-toast';
import {
	useCreateCommentMutation,
	useGetCommentsQuery,
} from '../../../features/comment/commentApi';
import { FormHandler } from '../../../types/custom';

//? lazy imports
const Comments = lazy(() => import('./Comments'));

type Props = {
	post_id: string;
};

const CommentSection: FC<Props> = ({ post_id }) => {
	const {
		data,
		isSuccess,
		// isError,
	} = useGetCommentsQuery(post_id || skipToken);
	const [createComment, { isLoading }] = useCreateCommentMutation();

	const handleCommentSubmit: FormHandler = (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const data = {
			comment: formData.get('comment'),
		};

		toast.promise(createComment({ body: data.comment, post_id }).unwrap(), {
			loading: 'Creating...',
			success: 'Comment successfully created',
			error: 'Could not create',
		});

		e.currentTarget.reset();
	};

	return (
		<section className='my-5'>
			<h1 className='title text-xl mb-2'>
				{data?.totalComments}{' '}
				{(data?.totalComments ?? 0) > 1 ? 'Comments' : 'Comment'}
			</h1>

			<form className='relative' onSubmit={handleCommentSubmit}>
				<input
					type='text'
					name='comment'
					id='comment'
					className={clsx(
						'block w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none border dark:border-dark-border dark:bg-dark-primary dark:placeholder-dark-muted dark:text-light-primary dark:focus:border-blue-500 transition-all'
						// {
						// 	'dark:border-red': !!error,
						// }
					)}
					placeholder='Write comment'
					required
					disabled={isLoading}
				/>

				<div className='absolute inset-y-0.5 end-0.5 flex items-center'>
					<button
						type='submit'
						disabled={isLoading}
						className='bg-blue-primary/80 disabled:bg-blue-primary/60 w-10 h-full rounded-e-md'
					>
						<CornerDownLeft className='w-full h-5 dark:text-light-primary' />
					</button>
				</div>
			</form>

			{isSuccess
				? data.comments.map((comment) => (
						<Comments key={comment.comment_id} {...comment} />
				  ))
				: null}
		</section>
	);
};

export default CommentSection;
