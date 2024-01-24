import { PropsWithChildren } from 'react';
import AccessDenied from '../components/AccessDenied';
import { UserRight } from '../contexts/user/types';
import useAuth from '../hooks/useAuth';

interface Props extends PropsWithChildren {
	permission: UserRight | UserRight[];
	links?: boolean;
}

const PermissionWrapper = ({ permission, children, links = false }: Props) => {
	// debugger;
	console.log('permission :', permission);
	const { state } = useAuth();
	console.log('state :', state);

	const right = state.user?.rights;
	// console.log('right :', right);

	const hasRight = Array.isArray(permission)
		? permission.includes(right!)
		: right === permission;

	console.log('hasRight :', hasRight);
	if (!hasRight) {
		return links ? null : <AccessDenied />;
	}

	return children;
};

export default PermissionWrapper;
