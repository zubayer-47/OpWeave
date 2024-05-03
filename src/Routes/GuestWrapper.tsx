import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const GuestWrapper = () => {
	const user = useAppSelector((state) => state.auth.user);
	const location = useLocation();

	console.log(user, location);

	if (user) return <Navigate to='/' replace />;

	if (location.pathname.replace(/\//g, '').endsWith('auth'))
		return <Navigate to='/auth/signin' replace />;

	return (
		<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
			<div className='w-102'>
				<Outlet />
			</div>
		</div>
	);
};

export default GuestWrapper;
