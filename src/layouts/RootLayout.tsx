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
			<div className='container mx-auto px-0 2xl:px-20 pt-20 h-screen overflow-hidden grid grid-cols-12'>
				<div
					className='w-full height_without_nav overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary px-2 lg:px-10 xl:px-28 col-span-full sm:col-span-7 xl:col-span-8'
					id='scrollableDiv'
				>
					<Outlet />
				</div>
				<CommunitySuggestions />
			</div>
			{isPostModalOpen ? <CreatePost singleCommunity /> : null}
		</>
	);
};

export default RootLayout;
