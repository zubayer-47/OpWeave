import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const PrivateWrapper = () => {
	const location = useLocation();
	const user = useAppSelector((state) => state.auth.user);
	const localAuth = localStorage.getItem('auth');
	const auth = !localAuth ? null : JSON.parse(localAuth);

	if (!auth?.access_token && !user)
		return <Navigate to='/auth/signin' state={{ from: location }} />;

	return <Outlet />;
};

export default PrivateWrapper;
