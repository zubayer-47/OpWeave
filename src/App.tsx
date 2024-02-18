import { Route, Routes } from 'react-router-dom';
import PermissionWrapper from './Routes/PermissionWrapper';
import EmptyScreen from './components/EmptyScreen';
import { UserRight } from './contexts/user/types';
import AuthLayout from './layouts/AuthLayout';
import RootLayout from './layouts/RootLayout';
import Auth from './pages/auth/Auth';
import Bookmarks from './pages/bookmarks/Bookmarks';
import Communities from './pages/communities/Communities';
import Home from './pages/home/Home';
import Notification from './pages/notification/Notification';

function App() {
	return (
		// <RootLayout>
		<Routes>
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Home />} />

				<Route path='explore' element={<EmptyScreen />} />
				<Route
					path='notifications'
					element={
						<PermissionWrapper
							permission={[UserRight.ADMIN, UserRight.MODER, UserRight.USER]}
							children={<Notification />}
						/>
					}
				/>
				<Route
					path='communities'
					element={
						<PermissionWrapper
							permission={[UserRight.ADMIN, UserRight.MODER, UserRight.USER]}
							children={<Communities />}
						/>
					}
				/>
				<Route
					path='bookmarks'
					element={
						<PermissionWrapper
							permission={[UserRight.ADMIN, UserRight.MODER, UserRight.USER]}
							children={<Bookmarks />}
						/>
					}
				/>
				<Route path='chat' element={<EmptyScreen />} />
				<Route path='profile' element={<EmptyScreen />} />
			</Route>

			<Route path='auth' element={<AuthLayout />}>
				<Route index element={<Auth />} />
			</Route>
		</Routes>
		// </RootLayout>
	);
}

export default App;
