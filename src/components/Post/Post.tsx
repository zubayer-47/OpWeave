import clsx from 'clsx';
import datekit from 'datekit';
import {
	Bookmark,
	MessageCircle,
	MessageSquareShare,
	MoreHorizontal,
	Trash2,
	Users2,
} from 'lucide-react';
import { lazy, useState } from 'react';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { useJoinMemberMutation } from '../../features/community/communityApi';
import { useDeletePostMutation } from '../../features/post/postApi';
import type { Post } from '../../features/post/types';
import { trunc } from '../../libs/helpers';
import Button from '../Buttons/Button';
import ClickableDropdown from '../ClickableDropdown';
import LoveIcon from '../errors/LoveIcon';
// import CommentSection from './partials/CommentSection';

//? lazy imports
const CommentSection = lazy(() => import('./partials/CommentSection'));

type Props = {
	post: Post;
};

const Post = ({
	post: {
		post_id,
		body,
		community: { name, members },
		community_id,
		image_url,
		image_height,
		reacts,
		member: {
			user: { avatar, fullname, username },
		},
		createdAt,
		hasAccess,
		hasJoined,
	},
}: // El,

Props) => {
	const [expanded, setExpanded] = useState(false);
	const [deletePost] = useDeletePostMutation();
	const [join] = useJoinMemberMutation();

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
		<div className='post px-2 sm:px-7 pt-5 relative' id='post'>
			<div className='flex-group justify-between' id='post_header'>
				<div className='flex-group' id='user_info'>
					<Link to={`/profile/${username}?sec=timeline`}>
						<LazyLoadImage
							className='profile'
							src={avatar}
							alt='profile picture'
							effect='blur'
						/>
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

				<div className='flex flex-col items-end' id='post_options'>
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
								className='!py-1.5 my-2'
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

			<div className='flex-grow flex flex-col items-center gap-2'>
				<Link
					id='post_body'
					to={`/posts/${post_id}`}
					className='title w-full font-Inter font-normal text-base hyphens-auto text-ellipsis'
				>
					{renderBody}
				</Link>

				{renderShowHide}

				{!!image_url && (
					<Link to={`/posts/${post_id}`} id='image_container'>
						<LazyLoadImage
							className={clsx('w-full max-h-[30rem] object-cover', {
								'!max-h-full': members?.length,
							})}
							src={image_url}
							alt='Post Image'
							effect='blur'
						/>
					</Link>
				)}
			</div>

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

			{members?.length ? <CommentSection post_id={post_id} /> : null}
		</div>
	);
};

export default Post;
