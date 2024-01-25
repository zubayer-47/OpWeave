import { MoreHorizontal } from 'lucide-react';
import bookmark from '../assets/icons/bookmark.svg';
import comment from '../assets/icons/comment.svg';
import heart from '../assets/icons/love.svg';
import share from '../assets/icons/share.svg';
import users from '../assets/icons/users.svg';
import profile from '../assets/profile.webp';

const Post = () => {
	return (
		<div className='post px-7 pt-5 pb-3 relative'>
			<div className='flex-group justify-between'>
				<div className='flex-group'>
					<img className='profile' src={profile} alt='profile picture' />
					<div>
						<h1 className='title text-lg'>A B M Zubayer</h1>
						<span className='muted'>@zubayerjs</span>
					</div>
				</div>

				<div className='flex flex-col items-end'>
					<div className='flex-group'>
						<img className='w-6 h-6' src={users} alt='community icon' />
						<button className='title text-sm'>dev community</button>
					</div>

					<div className='flex-group'>
						<button className='button'>Join</button>
						<button>
							<MoreHorizontal className='text-light' />
						</button>
					</div>
				</div>
			</div>

			<p className='title font-Inter font-normal text-base mt-5 mb-9'>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam
				tempore quo mollitia? Ullam eveniet fugiat commodi excepturi soluta
				cupiditate, assumenda tempora modi quod voluptates. Labore vel unde sint
				odit necessitatibus, cum earum voluptates voluptate quidem modi nesciunt
				quas, libero qui iure reprehenderit. Nulla tenetur aliquid maxime omnis,
				laborum est fuga perspiciatis inventore error minima accusamus unde qui
				necessitatibus quis vo blanditiis, in quo lorem100 perferendis hic
				dolorem consectetur dolore laudantium quidem odit. lorem200
			</p>

			<hr className='border-t dark:border-dark-border border-light-border absolute bottom-[3.9rem] right-0 left-0' />

			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<img src={heart} className='w-10 h-10' alt='like post' />
					<img src={comment} className='w-10 h-10' alt='comment on post' />
					<img src={share} className='w-9 h-9' alt='share post' />
				</div>

				<img src={bookmark} className='w-10 h-10' alt='save post' />
			</div>
		</div>
	);
};

export default Post;
