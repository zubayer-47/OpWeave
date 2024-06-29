import { FC, useState } from 'react';
import profile from '../../assets/profile2.jpg';
import { Comment } from '../../features/comment/types';
import { formatTime } from '../../libs/helpers';
import Replies from './Replies';

type Props = Comment;

const Comments: FC<Props> = ({
	comment_id,
	body,
	member: {
		role,
		member_id,
		user: { fullname },
	},
	createdAt,
	replyCount,
}) => {
	const [showReplies, setShowReplies] = useState(false);

	return (
		<>
			<div className='bg-dark-border/30 hover:bg-dark-border/50 p-2 rounded-md mt-5'>
				<div className='flex items-stretch justify-start gap-2'>
					<img src={profile} className='profile' alt='' />
					<div>
						<div className='flex gap-2'>
							<h1 className='title '>{fullname}</h1>
							<small className='text-dark-muted'>{formatTime(createdAt)}</small>
						</div>
						<small className='font-Poppins capitalize tracking-wider font-normal text-dark-muted bg-dark-border w-fit h-fit px-1.5 py-0.5 rounded-full select-none'>
							{role.toLowerCase()}
						</small>
					</div>
				</div>
				<p className='title font-normal font-Inter mt-3'>{body}</p>
				{/* <h3 className='title font-normal mt-5 bg-blue-primary w-fit rounded-full px-2 py-1'>
						replies
					</h3> */}
				<button
					type='button'
					className='title font-normal text-dark-muted border border-dark-border h-fit px-2 py-0.5 rounded-full mt-3'
					onClick={() => setShowReplies((prev) => !prev)}
				>
					{replyCount > 0 ? replyCount : null}{' '}
					{replyCount > 1 ? 'Replies' : 'Reply'}
				</button>
			</div>

			{showReplies ? (
				<Replies comment_id={comment_id} member_id={member_id} />
			) : null}
		</>
	);
};

export default Comments;
