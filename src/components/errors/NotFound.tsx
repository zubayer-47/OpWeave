import { HiOutlineEmojiSad } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const GoHome = () => (
	<Link
		to='/'
		className='inline-block mt-7 px-3 py-2 bg-cst-over text-cst-theme-white font-bold rounded-md'
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
		<main className='flex-1 page_body pb-3'>
			<div className='mx-3 md:mx-0 select-none overflow-hidden'>
				<p className='mb-2 text-5xl text-cst-red'>404</p>
				<p className='flex items-center mb-3 text-3xl font-bold text-cst-secondary-light'>
					<span>Page not found</span>
					<span className='ml-1'>:(</span>
				</p>
				<p className='text-gray-300'>
					Opps! the page you are looking for does&apos;t exist
				</p>
				<GoHome />
			</div>
		</main>
	</>
);

export default NotFound;
