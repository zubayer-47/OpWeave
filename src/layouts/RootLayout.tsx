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
			<div className='container mx-auto grid grid-cols-12 gap-2 px-10 h-screen overflow-hidden'>
				<Nav />
				<div className='col-span-6 mr-16'>{children}</div>
				<CommunitySuggestions />
			</div>
			{isPostModalOpen ? <CreatePost isModal /> : null}
		</>
	);
};

export default RootLayout;
