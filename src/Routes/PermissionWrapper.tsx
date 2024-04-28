import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import AccessDenied from '../components/AccessDenied';
import { UserRight } from '../features/auth/types';

interface Props extends PropsWithChildren {
	permission: UserRight | UserRight[];
	links?: boolean;
}

const PermissionWrapper = ({ permission, children, links = false }: Props) => {
	const { isLoggedIn, user } = useAppSelector((state) => state.auth);
	const right = user?.rights;
	const location = useLocation();

	const hasRight = Array.isArray(permission)
		? permission.includes(right as number)
		: right === permission;

	console.log(permission, right);

	// if (!user && !isLoggedIn)
	// 	return links ? null : <Navigate to={'/auth'} state={{ from: location }} />;

	// if (user && isLoggedIn && location.pathname === '/auth')
	// 	return <Navigate to='/' />;

	// if (!hasRight) return links ? null : <AccessDenied />;

	// return children;
};

export default PermissionWrapper;
