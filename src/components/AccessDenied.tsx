import { GoHome } from './errors/NotFound';

const AccessDenied = () => {
	return (
		<div className='flex flex-col justify-center items-center h-full'>
			<h2 className='text-6xl text-gray-600'>403</h2>
			<h3 className='title text-gray-400'>Access Denied!</h3>
			<GoHome label='Go Home' />
		</div>
	);
};

export default AccessDenied;
