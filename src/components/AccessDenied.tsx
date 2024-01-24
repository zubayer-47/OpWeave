import { Link } from 'react-router-dom';

const AccessDenied = () => {
	console.log('AccessDenied :');
	return (
		<div className='flex flex-col justify-center items-center h-full'>
			<h2 className='text-5xl text-gray-600'>403</h2>
			<h3 className='text-gray-400'>Access Denied!</h3>

			<Link
				to='/'
				className='hover:bg-teal-600/90 focus:ring-2 ring-teal-400/50 px-2 py-1 rounded-md text-sm text-gray-200 bg-teal-500 mt-5 transition-all duration-100'
			>
				Go Home
			</Link>
		</div>
	);
};

export default AccessDenied;
