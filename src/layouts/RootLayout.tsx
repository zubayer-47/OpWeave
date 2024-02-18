import { Outlet } from 'react-router-dom';
import CommunitySuggestions from '../components/CommunitySuggestions';
import CreatePost from '../components/CreatePost';
import Nav from '../components/Nav';
import useController from '../hooks/useController';

const RootLayout = () => {
	const {
		state: { isPostModalOpen },
	} = useController();
	return (
		<>
			<Nav />
			<div className='container mx-auto grid grid-cols-12 px-20 pt-20 h-screen overflow-hidden'>
				<div className='col-span-8 h-full px-28 overflow-y-auto scrollbar-none'>
					<Outlet />
				</div>
				<CommunitySuggestions />
			</div>
			{isPostModalOpen ? <CreatePost isModal /> : null}
		</>
	);
};

export default RootLayout;
