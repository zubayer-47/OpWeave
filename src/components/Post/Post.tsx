import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import datekit from 'datekit';
import {
	Bookmark,
	CornerDownLeft,
	MessageCircle,
	MessageSquareShare,
	MoreHorizontal,
	Trash2,
	Users2,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
	useCreateCommentMutation,
	useGetCommentsQuery,
} from '../../features/comment/commentApi';
import { useJoinMemberMutation } from '../../features/community/communityApi';
import { MemberRole } from '../../features/community/types';
import { useDeletePostMutation } from '../../features/post/postApi';
import type { Post } from '../../features/post/types';
import { trunc } from '../../libs/helpers';
import { FormHandler } from '../../types/custom';
import Button from '../Buttons/Button';
import ClickableDropdown from '../ClickableDropdown';
import LoveIcon from '../errors/LoveIcon';
import Comments from './Comments';

type Props = {
	post: Post;
	role?: MemberRole;
};

const Post = ({
	post: {
		post_id,
		body,
		community: { name, members },
		community_id,
		image_url,
		reacts,
		member: {
			user: { avatar, fullname, username },
		},
		createdAt,
		hasAccess,
		hasJoined,
	},
	role,
}: // El,

Props) => {
	const [expanded, setExpanded] = useState(false);
	const [deletePost] = useDeletePostMutation();
	const [join] = useJoinMemberMutation();
	const {
		data,
		isSuccess,
		// isError,
	} = useGetCommentsQuery(post_id || skipToken);
	const [createComment, { isLoading }] = useCreateCommentMutation();
	const uname = useAppSelector((state) => state.auth.user?.username);

	const toggleExpanded = () => {
		setExpanded(true);
	};

	const handleJoin = () => {
		toast.promise(join(community_id).unwrap(), {
			loading: 'Joining...',
			success: 'Member Joined Successfully.',
			error: "Couldn't Join",
		});
	};

	const handleDeletePost = () => {
		if (confirm('Are you sure! You want to delete this?')) {
			toast.promise(deletePost({ community_id, post_id }).unwrap(), {
				loading: 'Deleting...',
				success: 'Post successfully deleted.',
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

		toast.promise(createComment({ body: data.comment, post_id }).unwrap(), {
			loading: 'Creating...',
			success: 'Comment successfully created',
			error: 'Could not create',
		});

		e.currentTarget.reset();
	};

	let renderShowHide;
	let renderBody;

	if (body.length > 50) {
		if (expanded) {
			renderBody = body;
			// renderShowHide = (
			// 	<button className='title text-base' onClick={toggleExpanded}>
			// 		See Less
			// 	</button>
			// );
		} else {
			renderBody = trunc(body, 50);
			renderShowHide = (
				<button className='title text-base' onClick={toggleExpanded}>
					See More
				</button>
			);
		}
	} else {
		renderBody = trunc(body, 50);
		renderShowHide = null;
	}

	return (
		<div className='post px-2 sm:px-7 pt-5 relative'>
			<div className='flex-group justify-between'>
				<div className='flex-group'>
					<Link to={`/profile/${username}?sec=timeline`}>
						<img className='profile' src={avatar} alt='profile picture' />
					</Link>
					<div>
						<Link
							to={`/profile/${username}?sec=timeline`}
							className='flex items-center gap-2'
						>
							<h1 className='title'>{fullname}</h1>
							<small className='text-dark-muted'>
								{datekit(createdAt).status()}
							</small>
						</Link>
						<span className='muted'>@{username}</span>
					</div>
				</div>

				<div className='flex flex-col items-end'>
					<Link
						to={`/communities/${community_id}?sec=posts`}
						className='flex-group gap-1'
					>
						<Users2 className='icon size-5' />
						<span className='title text-sm'>{name}</span>
					</Link>

					<div className='flex-group'>
						{hasJoined ?? hasJoined ? null : (
							<Button
								text='Join'
								onClick={handleJoin}
								size='small'
								className='!py-1.5'
							/>
						)}

						{hasAccess ? (
							<ClickableDropdown
								button={
									<button type='button'>
										<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary transition-colors' />
									</button>
								}
							>
								<div className='dark:bg-dark-primary px-1 absolute right-5 top-16 flex flex-col border dark:border-dark-border rounded-xl z-10'>
									<button
										onClick={handleDeletePost}
										className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
										type='button'
									>
										<Trash2 className='text-red' strokeWidth={1.5} />
										<h3 className='title text-sm font-normal text-red'>
											Delete Post
										</h3>
									</button>
								</div>
							</ClickableDropdown>
						) : null}
					</div>
				</div>
			</div>

			<Link
				to={`/posts/${post_id}`}
				className='title w-full font-Inter font-normal text-base hyphens-auto text-ellipsis'
			>
				{renderBody}
			</Link>

			{renderShowHide}

			{!!image_url && (
				<Link to={`/posts/${post_id}`}>
					<img src={image_url} alt='Post Image' />
				</Link>
			)}

			<div className='flex items-center justify-between mt-5 mb-3 relative'>
				<hr className='border-t dark:border-dark-border border-light-border absolute -top-3 right-0 left-0' />
				<div className='flex items-center gap-3 relative'>
					<LoveIcon
						react={reacts?.length ? reacts[0].react_type : 'UNLIKE'}
						community_id={community_id}
						post_id={post_id}
					/>
					<MessageCircle className='size-8 text-light-muted dark:text-dark-muted' />
					<MessageSquareShare className='size-7 text-light-muted dark:text-dark-muted' />
				</div>
				<Bookmark className='size-8 text-light-muted dark:text-dark-muted' />
				{members?.length ? (
					<hr className='border-t dark:border-dark-border border-light-border absolute -bottom-3 right-0 left-0' />
				) : null}
			</div>

			{members?.length ? (
				<div className='my-5'>
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
				</div>
			) : null}
		</div>
	);
};

export default Post;
