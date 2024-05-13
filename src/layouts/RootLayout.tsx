import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import CommunitySuggestions from '../components/CommunitySuggestions';
import CreatePost from '../components/CreatePost';
import Nav from '../components/Nav';

const RootLayout = () => {
	// console.log('RootLayout');
	const isPostModalOpen = useAppSelector((state) => state.modal.isVisibleModal);

	return (
		<>
			<Nav />
			<div className='container mx-auto px-20 pt-20 h-screen overflow-hidden grid grid-cols-12'>
				<div className='w-full height_without_nav overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary px-28 col-span-8'>
					<Outlet />
				</div>
				<CommunitySuggestions />
			</div>
			{isPostModalOpen ? <CreatePost singleCommunity /> : null}
		</>
	);
};

export default RootLayout;
