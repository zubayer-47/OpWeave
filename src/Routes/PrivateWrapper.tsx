import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const PrivateWrapper = () => {
	const location = useLocation();
	const user = useAppSelector((state) => state.auth.user);

	const token = localStorage.getItem('access_token');

	if (!token && !user)
		return <Navigate to='/auth/signin' state={{ from: location }} />;

	return <Outlet />;
};

export default PrivateWrapper;
