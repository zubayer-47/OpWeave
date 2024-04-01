import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import Post from '../../../components/Post';
import OutletLayout from '../../../layouts/OutletLayout';

const Posts = () => {
	const params = useParams();

	return (
		<div className='grid grid-cols-2 gap-20 px-20 mt-10'>
			<div className='flex flex-col gap-10'>
				<Post />
				<Post />
				<Post />
			</div>

			<div>
				<OutletLayout title='About' sub='Developer Community'>
					<p className='title text-sm font-normal font-Inter px-4'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum error
						animi blanditiis unde facilis sapiente aliquid, dolor perferendis
						odio beatae nisi ducimus earum suscipit fugit quis recusandae
						laudantium? Saepe delectus sed reprehenderit a dolore, iste suscipit
						laboriosam voluptate, vitae illum repellendus necessitatibus harum
						magni amet maxime esse, aliquam debitis. Dicta?
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
							to={`/communities/${params.id}?sec=members`}
							className='text-blue-primary underline underline-offset-2 font-Poppins text-sm'
						>
							Members
						</Link>
					</div>
					<div className='flex items-center gap-5 px-4 my-5'>
						<Button text='Create Post' />
						<Button
							text='Info'
							className='outlet_btn hover:opacity-70 border-none px-12 transition-all'
						/>
					</div>
				</OutletLayout>
			</div>
		</div>
	);
};

export default Posts;
