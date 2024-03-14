import { HiOutlineEmojiSad } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const GoHome = () => (
	<Link
		to='/'
		className='inline-block mt-8 px-3 py-2 text-sm bg-nav-selected font-DM-Sans font-semibold rounded-md'
	>
		Go to Home
	</Link>
);

export const Unauthorized = () => (
	<>
		{/* <div className='p-3' /> */}
		<main className='flex-1 page_body pb-3'>
			<div className='mx-3 md:mx-0 select-none overflow-hidden'>
				<p className='mb-2 text-8xl text-cst-secondary'>
					<HiOutlineEmojiSad />
				</p>
				<p className='mb-2 text-3xl font-bold text-gray-200'>Unauthorized</p>
				<p className='text-gray-300'>Sorry! you can not access this page :(</p>
				<GoHome />
			</div>
		</main>
	</>
);

const NotFound = () => (
	<>
		{/* <div className='p-3' /> */}
		<main className='flex justify-center items-center h-screen text-center'>
			<div className='mx-3 md:mx-0 overflow-hidden'>
				<p className='mb-8 text-5xl text-rose-500'>404</p>
				<p className='flex items-center mb-3 text-3xl font-bold text-light-lighter dark:text-dark-text'>
					<span>Page not found</span>
					<span className='ml-1'> 😓 </span>
				</p>
				<p className='title text-sm text-light-lighter'>
					Opps! the page you are looking for does&apos;t exist
				</p>
				<GoHome />
			</div>
		</main>
	</>
);

export default NotFound;
