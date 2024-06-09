import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../../components/Buttons/Button';
import {
	useApprovePostMutation,
	useRejectPostMutation,
} from '../../../features/authority/authorityApi';
import { useDeletePostMutation } from '../../../features/post/postApi';
import type { PendingPost } from '../../../features/post/types';
import { trunc } from '../../../libs/helpers';

type Props = {
	post: PendingPost;
	isOwnPost?: boolean;
};

const PendingPost = ({
	post: {
		post_id,
		community_id,
		body,
		image_url,
		member: {
			user: { avatar, fullname },
		},
	},
	isOwnPost,
}: Props) => {
	const [expanded, setExpanded] = useState(false);
	const [approve] = useApprovePostMutation();
	const [reject] = useRejectPostMutation();
	const [deletePost] = useDeletePostMutation();

	const toggleExpanded = () => {
		setExpanded((prev) => !prev);
	};

	const handleApprove = () => {
		toast.promise(approve({ post_id, community_id }).unwrap(), {
			loading: 'Approving...',
			success: 'Approved Successfully.',
			error: 'Could not approve.',
		});
	};

	const handleReject = () => {
		if (confirm('Are you sure! You want to delete this?')) {
			toast.promise(reject({ post_id, community_id }).unwrap(), {
				loading: 'Rejecting...',
				success: 'Rejected Successfully.',
				error: 'Could not reject.',
			});
		}
	};

	const handleDelete = () => {
		if (confirm('Are you sure! You want to delete this?')) {
			toast.promise(deletePost({ post_id, community_id }).unwrap(), {
				loading: 'Deleting...',
				success: 'Deleted Successfully.',
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
		<div className='post px-7 pt-5 pb-3 max-w-100 w-full'>
			<div className='flex-group'>
				<img className='profile' src={avatar} alt='profile picture' />
				<div>
					<h1 className='title'>{fullname}</h1>
				</div>
			</div>

			<div className='title font-Inter font-normal text-base mt-5 mb-5 hyphens-auto text-ellipsis'>
				<p>{renderBody}</p>
			</div>

			{renderShowHide}

			{!!image_url && (
				<img src={image_url} className='w-full h-full' alt='Post Image' />
			)}

			<div className='flex w-full items-center gap-3 mt-3'>
				{isOwnPost ? (
					<Button
						onClick={handleDelete}
						text='Delete'
						size='small'
						fullWidth
						className='!py-1.5 bg-red/80 border-red/80 hover:bg-red/60 hover:border-red/60 dark:focus:ring-2 dark:focus:ring-red/70 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary'
					/>
				) : (
					<>
						<Button
							onClick={handleApprove}
							text='Approve'
							fullWidth
							size='small'
							className='!py-1.5'
						/>
						<Button
							onClick={handleReject}
							text='Reject'
							fullWidth
							size='small'
							className='!py-1.5 bg-red/80 border-red/80 hover:bg-red/60 hover:border-red/60 dark:focus:ring-2 dark:focus:ring-red/70 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary'
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default PendingPost;
