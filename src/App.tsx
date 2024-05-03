import { Route, Routes } from 'react-router-dom';
import GuestWrapper from './Routes/GuestWrapper';
import PrivateWrapper from './Routes/PrivateWrapper';
import EmptyScreen from './components/EmptyScreen';
import NotFound from './components/errors/NotFound';
import CenterLayout from './layouts/CenterLayout';
import RootLayout from './layouts/RootLayout';
import ForgetPass from './pages/auth/ForgetPass';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Bookmarks from './pages/bookmarks/Bookmarks';
import Communities from './pages/communities/Communities';
import Community from './pages/community/Community';
import Home from './pages/home/Home';
import Notification from './pages/notification/Notification';
import Settings from './pages/settings/Settings';
import UserProfile from './pages/userProfile/UserProfile';

function App() {
	// const dispatch = useAppDispatch();
	// const token = localStorage.getItem('access_token');
	// const { data, isLoading, isSuccess } = useGetUserQuery(undefined, {
	// 	skip: !token,
	// });

	// useMemo(() => {
	// 	if (!isLoading && isSuccess) {
	// 		dispatch(
	// 			userLoggedIn({
	// 				user: data,
	// 			})
	// 		);
	// 	}
	// }, [isLoading, isSuccess, dispatch, data]);
	// console.log('ap');

	// useEffect(() => {
	// 	const access_token = localStorage.getItem('access_token');

	// 	const promise = dispatch(userApi.endpoints.getUser.initiate());

	// 	console.log('app ');

	// 	(async () => {
	// 		if (access_token) {
	// 			const { data, isSuccess } = await promise;
	// 			if (isSuccess) {
	// 				dispatch(
	// 					userLoggedIn({
	// 						// access_token: auth.access_token,
	// 						user: data,
	// 					})
	// 				);
	// 			}
	// 		}
	// 	})();

	// 	return () => {
	// 		promise.unsubscribe();
	// 	};
	// }, []);

	return (
		<Routes>
			<Route element={<PrivateWrapper />}>
				<Route path='/' element={<RootLayout />}>
					<Route index element={<Home />} />

					<Route path='notifications' element={<Notification />} />
					<Route path='communities' element={<Communities />} />

					<Route path='bookmarks' element={<Bookmarks />} />
					<Route path='chat' element={<EmptyScreen />} />
				</Route>

				<Route element={<CenterLayout scroll className='pt-20 px-20' />}>
					<Route path='communities/:id' element={<Community />} />
					<Route path='profile/:username' element={<UserProfile />} />

					<Route path='settings' element={<Settings />} />

					<Route path='posts/:postId' element={<Settings />} />
				</Route>
			</Route>

			<Route element={<CenterLayout className='px-20 pt-20 overflow-hidden' />}>
				<Route path='auth' element={<GuestWrapper />}>
					<Route path='signin' element={<Login />} />
					<Route path='signup' element={<Register />} />
					<Route path='forget-pass' element={<ForgetPass />} />
				</Route>
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
		// </RootLayout>
	);
}

export default App;
