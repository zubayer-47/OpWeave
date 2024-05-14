import { PropsWithChildren } from 'react';
import { useAppSelector } from '../app/hooks';
import NotFound from '../components/errors/NotFound';
import { MemberRole } from '../features/community/types';

interface Props extends PropsWithChildren {
	right: MemberRole[];
}

const CommunityPermissionWrapper = ({ right, children }: Props) => {
	const member_role = useAppSelector((state) => state.community.member_role);
	console.log('member_role :', member_role);

	const hasPermission = right.includes(member_role);

	if (!hasPermission) {
		return <NotFound />;
	}

	return children;
};

export default CommunityPermissionWrapper;
