import { Outlet } from 'react-router-dom';
import PermissionWrapper from '../Routes/PermissionWrapper';
import CommunitySuggestions from '../components/CommunitySuggestions';
import CreatePost from '../components/CreatePost';
import Nav from '../components/Nav';
import { UserRight } from '../contexts/user/types';
import useAuth from '../hooks/useAuth';
import useController from '../hooks/useController';
import { permissions } from '../types/custom';

const RootLayout = () => {
	const {
		state: { isPostModalOpen },
	} = useController();

	const { state } = useAuth();

	const right = state.user?.rights;
	return (
		<>
			<Nav />
			<div className='container mx-auto px-20 pt-20 h-screen overflow-hidden grid grid-cols-12'>
				<div
					className={`w-full height_without_nav overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary px-28 ${
						!state.user || right === UserRight.FREE
							? 'col-span-full'
							: 'col-span-8'
					}`}
				>
					<Outlet />
				</div>
				<PermissionWrapper links permission={permissions.all}>
					<CommunitySuggestions />
				</PermissionWrapper>
			</div>
			{isPostModalOpen ? <CreatePost isModal /> : null}
		</>

		// <div>
		// 	<Outlet />
		// </div>
	);
};

export default RootLayout;
