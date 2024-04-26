import { Outlet } from 'react-router-dom';
import PermissionWrapper from '../Routes/PermissionWrapper';
import { useAppSelector } from '../app/hooks';
import CommunitySuggestions from '../components/CommunitySuggestions';
import CreatePost from '../components/CreatePost';
import Nav from '../components/Nav';
import { UserRight } from '../features/auth/types';
import { permissions } from '../types/custom';

const RootLayout = () => {
	const isPostModalOpen = useAppSelector(
		(state) => state.modal.isVisibleAuthModal
	);

	const user = useAppSelector((state) => state.auth.user);

	const right = user?.rights;
	return (
		<>
			<Nav />
			<div className='container mx-auto px-20 pt-20 h-screen overflow-hidden grid grid-cols-12'>
				<div
					className={`w-full height_without_nav overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary px-28 ${
						!user || right === UserRight.FREE ? 'col-span-full' : 'col-span-8'
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
