import { Route, Routes } from 'react-router-dom';
import PermissionWrapper from './Routes/PermissionWrapper';
import EmptyScreen from './components/EmptyScreen';
import NotFound from './components/errors/NotFound';
import CenterLayout from './layouts/CenterLayout';
import RootLayout from './layouts/RootLayout';
import Auth from './pages/auth/Auth';
import Bookmarks from './pages/bookmarks/Bookmarks';
import Communities from './pages/communities/Communities';
import Community from './pages/community/Community';
import Explore from './pages/explore/Explore';
import Home from './pages/home/Home';
import Notification from './pages/notification/Notification';
import Settings from './pages/settings/Settings';
import UserProfile from './pages/userProfile/UserProfile';
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
			</Route>

			<Route
				path='auth'
				element={<CenterLayout className='px-20 pt-20 overflow-hidden' />}
			>
				<Route
					index
					element={
						<PermissionWrapper
							children={<Auth />}
							permission={permissions.free}
						/>
					}
				/>
			</Route>

			<Route element={<CenterLayout scroll className='pt-20 px-20' />}>
				<Route
					path='communities/:id'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<Community />}
						/>
					}
				/>
				<Route
					path='profile'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<UserProfile />}
						/>
					}
				/>
				<Route
					path='explore'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<Explore />}
						/>
					}
				/>

				<Route
					path='settings'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<Settings />}
						/>
					}
				/>

				<Route
					path='posts/:postId'
					element={
						<PermissionWrapper
							permission={permissions.all}
							children={<Settings />}
						/>
					}
				/>
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
		// </RootLayout>
	);
}

export default App;
