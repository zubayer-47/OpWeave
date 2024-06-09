import { Route, Routes } from 'react-router-dom';
import GuestWrapper from './Routes/GuestWrapper';
import PrivateWrapper from './Routes/PrivateWrapper';
import NotFound from './components/errors/NotFound';
import RootLoader from './components/ui-placeholders/RootLoader';
import useAuthCheck from './hooks/useAuthCheck';
import CenterLayout from './layouts/CenterLayout';
import RootLayout from './layouts/RootLayout';
import ForgetPass from './pages/auth/ForgetPass';
import Login from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import Bookmarks from './pages/bookmarks/Bookmarks';
import Communities from './pages/communities/Communities';
import Community from './pages/community/Community';
import PendingPosts from './pages/community/PendingPosts';
import Manage from './pages/community/manage';
import ManageCommunity from './pages/community/manage/ManageCommunity';
import ManageRules from './pages/community/manage/ManageRules';
import Home from './pages/home/Home';
import PostView from './pages/post/PostView';
import Settings from './pages/settings/Settings';
import UserProfile from './pages/userProfile/UserProfile';

function App() {
	const isLoading = useAuthCheck();

	if (isLoading) {
		return <RootLoader />;
	}

	return (
		<Routes>
			<Route element={<PrivateWrapper />}>
				<Route path='/' element={<RootLayout />}>
					<Route index element={<Home />} />
					<Route path='communities' element={<Communities />} />
					<Route path='bookmarks' element={<Bookmarks />} />
				</Route>

				<Route
					element={<CenterLayout scroll className='pt-20 px-5 lg:px-20' />}
				>
					<Route path='communities/:id' element={<Community />} />
					<Route
						path='communities/:id/me/pending'
						element={<PendingPosts title='Your Pending Posts' />}
					/>
					<Route path='communities/:id/pending' element={<PendingPosts />} />
					<Route path='communities/:id/manage' element={<ManageCommunity />}>
						<Route index element={<Manage />} />
						<Route path='rules' element={<ManageRules />} />
						<Route path='pending_posts' element={<PendingPosts />} />
					</Route>
					<Route path='profile/:username' element={<UserProfile />} />

					<Route path='settings' element={<Settings />} />

					<Route path='posts/:postId' element={<PostView />} />
				</Route>
			</Route>

			{/* <Route element={<CenterLayout className='grid place-items-center' scroll />}> */}
			<Route path='auth' element={<GuestWrapper />}>
				<Route path='signin' element={<Login />} />
				<Route path='signup' element={<RegisterPage />} />
				<Route path='forget-pass' element={<ForgetPass />} />
			</Route>
			{/* </Route> */}

			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default App;
