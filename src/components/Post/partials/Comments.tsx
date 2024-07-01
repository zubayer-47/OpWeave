import datekit from 'datekit';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useDeleteCommentMutation } from '../../../features/comment/commentApi';
import { Comment } from '../../../features/comment/types';
import ClickableDropdown from '../../ClickableDropdown';
import Replies from '../Replies';

type Props = Comment;

const Comments: FC<Props> = ({
	post_id,
	comment_id,
	body,
	member: {
		role,
		user: { fullname, avatar },
	},
	createdAt,
	replyCount,
	hasAccess,
}) => {
	const [showReplies, setShowReplies] = useState(false);
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

	return (
		<>
			<div className='bg-dark-border/30 hover:bg-dark-border/50 p-2 rounded-md mt-5'>
				<div className='flex items-center justify-between gap-2 relative'>
					<div className='flex items-stretch gap-2'>
						<LazyLoadImage
							src={avatar}
							className='profile'
							alt="Commented member's profile"
							effect='blur'
						/>

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
									<Trash2 className='text-red' strokeWidth={1.5} size={18} />
									<small className='font-normal text-red'>Delete Post</small>
								</button>
							</div>
						</ClickableDropdown>
					) : null}
				</div>
				<p className='title font-normal font-Inter mt-3'>{body}</p>
				{/* <h3 className='title font-normal mt-5 bg-blue-primary w-fit rounded-full px-2 py-1'>
						replies
					</h3> */}
				<button
					type='button'
					className='title font-Inter font-normal text-dark-muted border border-dark-border h-fit px-2 py-0.5 rounded-full mt-3'
					onClick={() => setShowReplies((prev) => !prev)}
				>
					{replyCount > 0 ? replyCount : null}{' '}
					{replyCount > 1 ? 'Replies' : 'Reply'}
				</button>
			</div>

			{showReplies ? (
				<Replies parent_comment_id={comment_id} post_id={post_id} />
			) : null}
		</>
	);
};

export default Comments;
