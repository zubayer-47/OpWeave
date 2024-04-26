import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const Auth = () => {
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const navigate = useNavigate();
	const location = useLocation();

	if (isLoggedIn) {
		navigate('/', { replace: true });
		return;
	}

	if (location.pathname === '/auth')
		return <Navigate to='/auth/signin' replace />;

	return (
		<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
			<div className='w-102'>
				<Outlet />
			</div>
		</div>
	);
};

export default Auth;
