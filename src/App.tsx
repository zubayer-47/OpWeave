import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import GuestWrapper from './Routes/GuestWrapper';
import PrivateWrapper from './Routes/PrivateWrapper';
import RootLoader from './components/ui-placeholders/RootLoader';
import useAuthCheck from './hooks/useAuthCheck';
import CenterLayout from './layouts/CenterLayout';
import RootLayout from './layouts/RootLayout';
// import ForgetPass from './pages/auth/ForgetPass';
// import Login from './pages/auth/Login';
// import RegisterPage from './pages/auth/Register';
// import NotFound from './components/errors/NotFound';
// import Bookmarks from './pages/bookmarks/Bookmarks';
// import Communities from './pages/communities/Communities';
// import Community from './pages/community/Community';
// import PendingPosts from './pages/community/PendingPosts';
// import Manage from './pages/community/manage';
// import ManageCommunity from './pages/community/manage/ManageCommunity';
// import ManageRules from './pages/community/manage/ManageRules';
// import Home from './pages/home/Home';
// import PostView from './pages/post/PostView';
// import Settings from './pages/settings/Settings';
// import UserProfile from './pages/userProfile/UserProfile';

function App() {
	const isLoading = useAuthCheck();

	// lazy imports
	const Login = lazy(() => import('./pages/auth/Login'));
	const RegisterPage = lazy(() => import('./pages/auth/Register'));
	const ForgetPass = lazy(() => import('./pages/auth/ForgetPass'));
	const Bookmarks = lazy(() => import('./pages/bookmarks/Bookmarks'));
	const Communities = lazy(() => import('./pages/communities/Communities'));
	const Community = lazy(() => import('./pages/community/Community'));
	const PendingPosts = lazy(() => import('./pages/community/PendingPosts'));
	const Manage = lazy(() => import('./pages/community/manage'));
	const PostView = lazy(() => import('./pages/post/PostView'));
	const Settings = lazy(() => import('./pages/settings/Settings'));
	const UserProfile = lazy(() => import('./pages/userProfile/UserProfile'));
	const NotFound = lazy(() => import('./components/errors/NotFound'));
	const Home = lazy(() => import('./pages/home/Home'));
	const ManageRules = lazy(
		() => import('./pages/community/manage/ManageRules')
	);
	const ManageCommunity = lazy(
		() => import('./pages/community/manage/ManageCommunity')
	);

	if (isLoading) {
		return <RootLoader />;
	}

	return (
		<Routes>
			<Route element={<PrivateWrapper />}>
				<Route path='/' element={<RootLayout />}>
					<Route
						index
						element={
							<Suspense
								fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
							>
								<Home />
							</Suspense>
						}
					/>
					<Route
						path='communities'
						element={
							<Suspense
								fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
							>
								<Communities />
							</Suspense>
						}
					/>
					<Route
						path='bookmarks'
						element={
							<Suspense
								fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
							>
								<Bookmarks />
							</Suspense>
						}
					/>
				</Route>

				<Route
					element={<CenterLayout scroll className='pt-20 px-5 lg:px-20' />}
				>
					<Route
						path='communities/:id'
						element={
							<Suspense
								fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
							>
								<Community />
							</Suspense>
						}
					/>
					<Route
						path='communities/:id/me/pending'
						element={
							<Suspense
								fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
							>
								<PendingPosts title='Your Pending Posts' />
							</Suspense>
						}
					/>
					<Route
						path='communities/:id/pending'
						element={
							<Suspense
								fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
							>
								<PendingPosts />
							</Suspense>
						}
					/>
					<Route
						path='communities/:id/manage'
						element={
							<Suspense
								fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
							>
								<ManageCommunity />
							</Suspense>
						}
					>
						<Route
							index
							element={
								<Suspense
									fallback={
										<h1 className='title text-dark-muted'>Loading...</h1>
									}
								>
									<Manage />
								</Suspense>
							}
						/>
						<Route
							path='rules'
							element={
								<Suspense
									fallback={
										<h1 className='title text-dark-muted'>Loading...</h1>
									}
								>
									<ManageRules />
								</Suspense>
							}
						/>
						<Route
							path='pending_posts'
							element={
								<Suspense
									fallback={
										<h1 className='title text-dark-muted'>Loading...</h1>
									}
								>
									<PendingPosts />
								</Suspense>
							}
						/>
					</Route>
					<Route
						path='profile/:username'
						element={
							<Suspense
								fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
							>
								<UserProfile />
							</Suspense>
						}
					/>

					<Route
						path='settings'
						element={
							<Suspense
								fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
							>
								<Settings />
							</Suspense>
						}
					/>

					<Route path='posts/:postId' element={<PostView />} />
				</Route>
			</Route>

			{/* <Route element={<CenterLayout className='grid place-items-center' scroll />}> */}
			<Route path='auth' element={<GuestWrapper />}>
				<Route
					path='signin'
					element={
						<Suspense
							fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
						>
							<Login />
						</Suspense>
					}
				/>
				<Route
					path='signup'
					element={
						<Suspense
							fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
						>
							<RegisterPage />
						</Suspense>
					}
				/>
				<Route
					path='forget-pass'
					element={
						<Suspense
							fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
						>
							<ForgetPass />
						</Suspense>
					}
				/>
			</Route>
			{/* </Route> */}

			<Route
				path='*'
				element={
					<Suspense
						fallback={<h1 className='title text-dark-muted'>Loading...</h1>}
					>
						<NotFound />
					</Suspense>
				}
			/>
		</Routes>
	);
}

export default App;
