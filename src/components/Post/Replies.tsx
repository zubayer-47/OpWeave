import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import datekit from 'datekit';
import { CornerDownLeft } from 'lucide-react';
import { FC } from 'react';
import profile from '../../assets/profile.webp';
import {
	useCreateCommentReplyMutation,
	useGetCommentRepliesQuery,
} from '../../features/comment/commentApi';
import { FormHandler } from '../../types/custom';

type Props = {
	comment_id: string;
	member_id: string;
};
const Replies: FC<Props> = ({ comment_id, member_id }) => {
	const { data, isSuccess } = useGetCommentRepliesQuery(
		comment_id || skipToken
	);
	const [createCommentReply] = useCreateCommentReplyMutation();

	const handleCommentSubmit: FormHandler = (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const data = {
			comment: formData.get('comment'),
		};

		createCommentReply({ body: data.comment, member_id, comment_id });

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
							user: { fullname },
						},
					}) => (
						<div
							key={comment_id}
							className='bg-dark-border/30 hover:bg-dark-border/50 p-2 rounded-md mt-5'
						>
							<div className='flex items-stretch justify-start gap-2'>
								<img src={profile} className='profile' alt='' />
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
