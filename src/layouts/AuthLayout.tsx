import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

const AuthLayout = () => {
	return (
		<>
			<Nav />
			<div className='container mx-auto w-full h-screen px-20 pt-20 overflow-hidden'>
				<Outlet />
			</div>
		</>
	);
};

export default AuthLayout;
