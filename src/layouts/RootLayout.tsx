import { PropsWithChildren } from 'react';
import CommunitySuggestions from '../components/CommunitySuggestions';
import CreatePost from '../components/CreatePost';
import Nav from '../components/Nav';
import useController from '../hooks/useController';

const RootLayout = ({ children }: PropsWithChildren) => {
	const {
		state: { isPostModalOpen },
	} = useController();
	return (
		<>
			<Nav />
			<div className='container mx-auto grid grid-cols-12 gap-2 px-20 pt-28 h-screen overflow-hidden'>
				<div className='col-span-8 h-full px-28 overflow-y-auto scrollbar-none'>
					{children}
				</div>
				<CommunitySuggestions />
			</div>
			{isPostModalOpen ? <CreatePost isModal /> : null}
		</>
	);
};

export default RootLayout;
