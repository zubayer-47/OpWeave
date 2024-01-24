import { PropsWithChildren } from 'react';
import Nav from '../components/Nav';

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='container mx-auto grid grid-cols-12 gap-2 px-10 h-screen overflow-hidden'>
			<Nav />
			<div className='col-start-4 col-end-13'>{children}</div>
		</div>
	);
};

export default RootLayout;
