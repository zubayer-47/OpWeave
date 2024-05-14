import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../../components/Buttons/Button';
import {
	useApprovePostMutation,
	useRejectPostMutation,
} from '../../../features/authority/authorityApi';
import { PendingPost } from '../../../features/post/types';

type Props = {
	post: PendingPost;
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
}: Props) => {
	const [expanded, setExpanded] = useState(false);
	const [approve] = useApprovePostMutation();
	const [reject] = useRejectPostMutation();

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
		toast.promise(reject({ post_id, community_id }).unwrap(), {
			loading: 'Rejecting...',
			success: 'Rejected Successfully.',
			error: 'Could not reject.',
		});
	};

	let renderShowHide;

	if (body.length > 50) {
		renderShowHide = null;
	} else {
		renderShowHide = expanded ? (
			<button className='title text-base' onClick={toggleExpanded}>
				See Less
			</button>
		) : (
			<button className='title text-base' onClick={toggleExpanded}>
				See More
			</button>
		);
	}
	return (
		<div className='post px-7 pt-5 pb-3 max-w-100'>
			<div className='flex-group'>
				<img className='profile' src={avatar} alt='profile picture' />
				<div>
					<h1 className='title'>{fullname}</h1>
				</div>
			</div>

			<div className='title font-Inter font-normal text-base mt-5 mb-5 hyphens-auto text-ellipsis'>
				<>{body ? body.slice(0, 50) : body}</>
			</div>

			{renderShowHide}

			{!!image_url && (
				<img src={image_url} className='w-full h-full' alt='Post Image' />
			)}

			<div className='flex items-center gap-5 mt-3'>
				<Button
					text='Approve'
					size='small'
					className='!py-1.5'
					onClick={handleApprove}
				/>
				<Button
					onClick={handleReject}
					text='Reject'
					size='small'
					className='!py-1.5 bg-red/80 border-red/80 hover:bg-red/60 hover:border-red/60 dark:focus:ring-2 dark:focus:ring-red/70 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary'
					variant='outline'
				/>
			</div>
		</div>
	);
};

export default PendingPost;
