import { Route, Routes } from 'react-router-dom';
import PermissionWrapper from './Routes/PermissionWrapper';
import EmptyScreen from './components/EmptyScreen';
import NotFound from './components/errors/NotFound';
import AuthLayout from './layouts/AuthLayout';
import RootLayout from './layouts/RootLayout';
import Auth from './pages/auth/Auth';
import Bookmarks from './pages/bookmarks/Bookmarks';
import Communities from './pages/communities/Communities';
import Home from './pages/home/Home';
import Notification from './pages/notification/Notification';
import { permissions } from './types/custom';

function App() {
	return (
		<Routes>
			<Route path='/' element={<RootLayout />}>
				<Route
					index
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<Home />}
						/>
					}
				/>

				<Route
					path='explore'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<EmptyScreen />}
						/>
					}
				/>
				<Route
					path='notifications'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<Notification />}
						/>
					}
				/>
				<Route
					path='communities'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<Communities />}
						/>
					}
				/>
				<Route
					path='bookmarks'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<Bookmarks />}
						/>
					}
				/>
				<Route
					path='chat'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<EmptyScreen />}
						/>
					}
				/>
				<Route
					path='profile'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<EmptyScreen />}
						/>
					}
				/>
				<Route
					path='settings'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<EmptyScreen />}
						/>
					}
				/>
			</Route>

			<Route path='auth' element={<AuthLayout />}>
				<Route index element={<Auth />} />
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
		// </RootLayout>
	);
}

export default App;
