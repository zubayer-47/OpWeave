import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const GuestWrapper = () => {
	const user = useAppSelector((state) => state.auth.user);
	const location = useLocation();

	if (user) return <Navigate to='/' replace />;

	if (location.pathname.replace(/\/$/g, '').endsWith('auth'))
		return <Navigate to='/auth/signin' replace />;

	return (
		// <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
		// <div className=''>
			<div className='overflow-y-auto h-screen grid place-items-center mx-2 scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary py-5 px-1'>
				<Outlet />
			</div>
		// </div>
	);
};

export default GuestWrapper;
