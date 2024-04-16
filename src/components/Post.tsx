import { Heart, MoreHorizontal, Users2 } from 'lucide-react';
import { useState } from 'react';
import bookmark from '../assets/icons/bookmark.svg';
import comment from '../assets/icons/comment.svg';
import share from '../assets/icons/share.svg';
import profile from '../assets/profile2.jpg';
import { trunc } from '../libs/helpers';
import Button from './Buttons/Button';

const Post = () => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};
	return (
		<div className='post px-7 pt-5 pb-3 relative'>
			<div className='flex-group justify-between'>
				<div className='flex-group'>
					<img className='profile' src={profile} alt='profile picture' />
					<div>
						<h1 className='title'>A B M Zubayer</h1>
						<span className='muted'>@zubayerjs</span>
					</div>
				</div>

				<div className='flex flex-col items-end'>
					<div className='flex-group'>
						<Users2 className='icon size-6' />
						<button type='button' className='title text-sm'>
							dev community
						</button>
					</div>

					<div className='flex-group'>
						<Button text='Join' size='small' className='!py-1.5' />
						<button type='button'>
							<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary transition-colors' />
						</button>
					</div>
				</div>
			</div>

			<button
				type='button'
				className='w-full max-h-[45rem] h-fit mt-5 overflow-hidden'
			>
				<img
					src={profile}
					className='size-full object-contain'
					alt='Post image'
				/>
			</button>

			<p className='title font-Inter font-normal text-base mt-5 mb-5 hyphens-auto'>
				{expanded
					? 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnamipsam tempore quo mollitia? Ullam eveniet fugiat commodi excepturi soluta cupiditate, assumenda tempora modi quod voluptates. Labore vel unde sint odit necessitatibus, cum earum voluptates voluptate quidem modi nesciunt quas, libero qui iure reprehenderit. Nulla tenetur aliquid maxime omnis, laborum est fuga perspiciatis inventore error minima accusamus unde qui necessitatibus quis vo blanditiis, in quo lorem100 perferendis hicdolorem consectetur dolore laudantium quidem odit. lorem200'
					: trunc(
							'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnamipsam tempore quo mollitia? Ullam eveniet fugiat commodi excepturi soluta cupiditate, assumenda tempora modi quod voluptates. Labore vel unde sint odit necessitatibus, cum earum voluptates voluptate quidem modi nesciunt quas, libero qui iure reprehenderit. Nulla tenetur aliquid maxime omnis, laborum est fuga perspiciatis inventore error minima accusamus unde qui necessitatibus quis vo blanditiis, in quo lorem100 perferendis hicdolorem consectetur dolore laudantium quidem odit. lorem200',
							200
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  )}
				{expanded ? (
					<button className='title text-base' onClick={toggleExpanded}>
						See Less
					</button>
				) : (
					<button className='title text-base' onClick={toggleExpanded}>
						See More
					</button>
				)}
			</p>

			<hr className='border-t dark:border-dark-border border-light-border absolute bottom-[3.9rem] right-0 left-0' />

			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					{/* <img src={heart} className='size-10' alt='like post icon' /> */}
					<Heart className='size-8 text-light-muted dark:text-dark-muted' />
					<img src={comment} className='size-10' alt='comment on post icon' />
					<img src={share} className='size-9' alt='share post icon' />
				</div>

				<img src={bookmark} className='size-10' alt='save post' />
			</div>
		</div>
	);
};

export default Post;
