import { Link } from 'react-router-dom';
import profile from '../../assets/profile2.jpg';
import Button from '../../components/Buttons/Button';
import HorizontalMore from '../../components/Buttons/HorizontalMore';
import Hr from '../../components/Hr';
import Post from '../../components/Post';
import OutletLayout from '../../layouts/OutletLayout';

const Community = () => {
	return (
		<div className='mt-28'>
			<div className='flex items-center justify-between px-14'>
				<div className='flex items-end gap-5'>
					<img
						className='size-40 object-cover rounded-full'
						src={profile}
						alt='community profile'
					/>

					<div className='mb-3'>
						<h1 className='title text-xl'>Dev Community</h1>
						<span className='muted'>Developer Community</span>
					</div>
				</div>

				<HorizontalMore />
			</div>

			<div className='flex justify-start items-center gap-20 mt-10 mb-2 px-14'>
				<button type='button' className='title'>
					Posts
				</button>
				<button type='button' className='title'>
					Info
				</button>
				<button type='button' className='title'>
					Photos
				</button>
				<button type='button' className='title'>
					Videos
				</button>
				<button type='button' className='title'>
					Members
				</button>
			</div>
			<Hr />

			<div className='grid grid-cols-2 gap-20 px-36 mt-10'>
				<div className='flex flex-col gap-10'>
					<Post />
					<Post />
					<Post />
				</div>

				<div>
					<OutletLayout title='About' sub='Developer Community'>
						<p className='title text-sm font-normal font-Inter px-4'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
							error animi blanditiis unde facilis sapiente aliquid, dolor
							perferendis odio beatae nisi ducimus earum suscipit fugit quis
							recusandae laudantium? Saepe delectus sed reprehenderit a dolore,
							iste suscipit laboriosam voluptate, vitae illum repellendus
							necessitatibus harum magni amet maxime esse, aliquam debitis.
							Dicta?
						</p>

						<div className='flex items-center gap-4 pl-5 pr-4'>
							<div className='flex items-center'>
								<span className='size-7 bg-dark-primary -ml-1 border dark:border-dark-border rounded-full'></span>
								<span className='size-7 bg-dark-primary -ml-1 border dark:border-dark-border rounded-full'></span>
								<span className='size-7 bg-dark-primary -ml-1 border dark:border-dark-border rounded-full'></span>
								<span className='size-7 bg-dark-primary -ml-1 border dark:border-dark-border rounded-full'></span>
								<span className='size-7 bg-dark-primary -ml-1 border dark:border-dark-border rounded-full'></span>
								<span className='size-7 bg-dark-primary -ml-1 border dark:border-dark-border rounded-full'></span>
								<span className='title text-sm font-normal text-light-primary/70 pl-1'>
									+200
								</span>
							</div>

							<Link
								to='/'
								className='text-blue-primary underline underline-offset-2 font-Poppins text-sm'
							>
								Members
							</Link>
						</div>
						<div className='flex items-center gap-5 px-4 my-5'>
							<Button title='Create Post' />
							<Button
								title='Info'
								transparent
								className='outlet_btn hover:opacity-70 border-none px-8 transition-all'
							/>
						</div>
					</OutletLayout>
				</div>
			</div>
		</div>
	);
};

export default Community;
