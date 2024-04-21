import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AccessDenied from '../components/AccessDenied';
import { UserRight } from '../contexts/user/types';
import useAuth from '../hooks/useAuth';

interface Props extends PropsWithChildren {
	permission: UserRight | UserRight[];
	links?: boolean;
}

const PermissionWrapper = ({ permission, children, links = false }: Props) => {
	const { state } = useAuth();
	const right = state.user?.rights;
	const location = useLocation();

	// 100 permission code means it's a public route
	if (!right && permission === 100) {
		return children;
	}

	const hasRight = Array.isArray(permission)
		? permission.includes(right as number)
		: right === permission;

	if (!state.user && !state.isLoggedIn)
		return links ? null : <Navigate to={'/auth'} state={{ from: location }} />;

	if (state.user && state.isLoggedIn && location.pathname === '/auth')
		return <Navigate to='/' />;

	if (!hasRight) return links ? null : <AccessDenied />;

	return children;
};

export default PermissionWrapper;
