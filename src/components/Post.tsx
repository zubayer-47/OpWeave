import {
	Bookmark,
	Heart,
	MessageCircle,
	MessageSquareShare,
	MoreHorizontal,
	Trash2,
	Users2,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDeletePostMutation } from '../features/post/postApi';
import type { Post } from '../features/post/types';
import { trunc } from '../libs/helpers';
import Button from './Buttons/Button';
import ClickableDropdown from './ClickableDropdown';

type Props = {
	post: Post;
};

const Post = ({
	post: {
		post_id,
		body,
		community: { name },
		community_id,
		image_url,
		member: {
			user: { avatar, fullname, username },
		},
	},
}: // El,
Props) => {
	const [expanded, setExpanded] = useState(false);
	const [deletePost] = useDeletePostMutation();

	const toggleExpanded = () => {
		setExpanded(true);
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
		<div className='post px-7 pt-5 pb-3 relative'>
			<div className='flex-group justify-between'>
				<div className='flex-group'>
					<Link to={`/profile/${username}?sec=timeline`}>
						<img className='profile' src={avatar} alt='profile picture' />
					</Link>
					<div>
						<Link to={`/profile/${username}?sec=timeline`}>
							<h1 className='title'>{fullname}</h1>
						</Link>
						<span className='muted'>@{username}</span>
					</div>
				</div>

				<div className='flex flex-col items-end'>
					<Link
						to={`/communities/${community_id}?sec=posts`}
						className='flex-group'
					>
						<Users2 className='icon size-6' />
						<span className='title text-sm'>{name}</span>
					</Link>

					<div className='flex-group'>
						<Button text='Join' size='small' className='!py-1.5' />
						{/* <button type='button'>
							<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary transition-colors' />
						</button> */}

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
					</div>
				</div>
			</div>

			<div className='title font-Inter font-normal text-base mt-5 mb-5 hyphens-auto text-ellipsis'>
				<p>{renderBody}</p>
			</div>

			{renderShowHide}

			{!!image_url && (
				<Link to={`/posts/${post_id}`} state={{ community_id, post_id }}>
					<img src={image_url} alt='Post Image' />
				</Link>
			)}

			<hr className='border-t dark:border-dark-border border-light-border absolute bottom-14 right-0 left-0' />
			<div className='flex items-center justify-between mt-5'>
				<div className='flex items-center gap-3'>
					<Heart className='size-8 text-light-muted dark:text-dark-muted' />
					<MessageCircle className='size-8 text-light-muted dark:text-dark-muted' />
					<MessageSquareShare className='size-7 text-light-muted dark:text-dark-muted' />
				</div>
				<Bookmark className='size-8 text-light-muted dark:text-dark-muted' />
			</div>
		</div>
	);
};

export default Post;
