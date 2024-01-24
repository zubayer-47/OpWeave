import { Heart, MessageCircleIcon, MoreHorizontal, Share2 } from 'lucide-react';
import users from '../assets/icons/users.svg';
import profile from '../assets/profile.webp';

const Post = () => {
	return (
		<div className='post px-7 py-5 relative'>
			<div className=''>
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

				<p className='title font-Inter font-normal text-base mt-5'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam
					tempore quo mollitia? Ullam eveniet fugiat commodi excepturi soluta
					cupiditate, assumenda tempora modi quod voluptates. Labore vel unde
					sint odit necessitatibus, cum earum voluptates voluptate quidem modi
					nesciunt quas, libero qui iure reprehenderit. Nulla tenetur aliquid
					maxime omnis, laborum est fuga perspiciatis inventore error minima
					accusamus unde qui necessitatibus quis voluptas aspernatur iusto
					asperiores, blanditiis iste iure provident. Incidunt, ut assumenda! Id
					voluptates dolorum ipsa sapiente accusamus enim aspernatur, officiis
					est aperiam voluptate assumenda! Dicta earum incidunt esse nesciunt
					blanditiis, in quo perferendis hic dolorem consectetur dolore
					laudantium quidem odit.
				</p>
			</div>

			<hr className='absolute bottom-20 left-0 right-0 border-b border-dark-border' />

			<div className='mt-10'>
				<div className='flex items-center gap-3'>
					<Heart className='w-10 h-10 dark:text-light text-dark' />
					<MessageCircleIcon className='w-10 h-10 dark:text-light text-dark' />
					<Share2 className='w-10 h-10 dark:text-light text-dark' />
				</div>
			</div>
		</div>
	);
};

export default Post;
