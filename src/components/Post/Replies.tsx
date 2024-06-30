import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import datekit from 'datekit';
import { CornerDownLeft, MoreHorizontal, Trash2 } from 'lucide-react';
import { FC } from 'react';
import toast from 'react-hot-toast';
import {
	useCreateCommentReplyMutation,
	useDeleteCommentMutation,
	useGetCommentRepliesQuery,
} from '../../features/comment/commentApi';
import { FormHandler } from '../../types/custom';
import ClickableDropdown from '../ClickableDropdown';

type Props = {
	comment_id: string;
	post_id: string;
};

const Replies: FC<Props> = ({ comment_id, post_id }) => {
	const { data, isSuccess } = useGetCommentRepliesQuery(
		comment_id || skipToken
	);
	const [createCommentReply] = useCreateCommentReplyMutation();

	const [deleteComment] = useDeleteCommentMutation();

	const handleDeletePost = () => {
		if (confirm('Are you sure! You want to delete this?')) {
			toast.promise(deleteComment(comment_id).unwrap(), {
				loading: 'Deleting...',
				success: 'Comment successfully deleted.',
				error: 'Could not delete.',
			});
		}
	};

	const handleCommentSubmit: FormHandler = (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const data = {
			comment: formData.get('comment'),
		};

		toast.promise(
			createCommentReply({ body: data.comment, comment_id, post_id }).unwrap(),
			{
				loading: 'Replying...',
				success: <strong>Replied Successfully</strong>,
				error: <strong>Could not reply</strong>,
			}
		);

		e.currentTarget.reset();
	};

	return (
		<div className='ps-8'>
			{isSuccess && !data.replies.length ? (
				<h1 className='title text-dark-muted text-sm my-2 text-center'>
					No Replies
				</h1>
			) : (
				isSuccess &&
				data.replies.map(
					({
						body,
						comment_id,
						createdAt,
						member: {
							role,
							user: { fullname, avatar },
						},
						hasAccess,
					}) => (
						<div
							key={comment_id}
							className='bg-dark-border/30 hover:bg-dark-border/50 p-2 rounded-md mt-5'
						>
							<div className='flex items-center justify-between gap-2 relative'>
								<div className='flex items-stretch gap-2'>
									<img src={avatar} className='profile' alt='' />
									<div>
										<div className='flex gap-2'>
											<h1 className='title '>{fullname}</h1>
											<small className='text-dark-muted'>
												{datekit(createdAt).status()}
											</small>
										</div>
										<small className='font-Poppins capitalize tracking-wider font-normal text-dark-muted bg-dark-border w-fit h-fit px-1.5 py-0.5 rounded-full select-none'>
											{role.toLowerCase()}
										</small>
									</div>
								</div>

								{hasAccess ? (
									<ClickableDropdown
										button={
											<button type='button'>
												<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary transition-colors' />
											</button>
										}
									>
										<div className='dark:bg-dark-primary px-1 absolute right-3 top-8 flex flex-col border dark:border-dark-border rounded-xl z-10'>
											<button
												onClick={handleDeletePost}
												className='flex items-center gap-2 py-1.5 px-2 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
												type='button'
											>
												<Trash2
													className='text-red'
													strokeWidth={1.5}
													size={18}
												/>
												<small className='font-normal text-red'>
													Delete Post
												</small>
											</button>
										</div>
									</ClickableDropdown>
								) : null}
							</div>
							<p className='title font-normal font-Inter mt-3'>{body}</p>
						</div>
					)
				)
			)}

			<form className='relative mt-3' onSubmit={handleCommentSubmit}>
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
					placeholder='Write comment reply'
					required
					// disabled={isLoading}
				/>

				<div className='absolute inset-y-0.5 end-0.5 flex items-center'>
					<button
						type='submit'
						// disabled={isLoading}
						className='bg-blue-primary/80 disabled:bg-blue-primary/60 w-10 h-full rounded-e-md'
					>
						<CornerDownLeft className='w-full h-5 dark:text-light-primary' />
					</button>
				</div>
			</form>
		</div>
	);
};

export default Replies;
