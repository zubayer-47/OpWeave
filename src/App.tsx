import TestContainer from './components/TestContainer';

function App() {
	// const isLoading = useAuthCheck();

	// if (isLoading) {
	// 	return <RootLoader />;
	// }

	return (
		// <Routes>
		// 	<Route element={<PrivateWrapper />}>
		// 		<Route path='/' element={<RootLayout />}>
		// 			<Route index element={<Home />} />
		// 			<Route path='communities' element={<Communities />} />
		// 			<Route path='bookmarks' element={<Bookmarks />} />
		// 		</Route>

		// 		<Route
		// 			element={<CenterLayout scroll className='pt-20 px-5 lg:px-20' />}
		// 		>
		// 			<Route path='communities/:id' element={<Community />} />
		// 			<Route path='communities/:id/pending' element={<PendingPosts />} />
		// 			<Route path='communities/:id/manage' element={<ManageCommunity />}>
		// 				<Route index element={<Manage />} />
		// 				<Route path='rules' element={<ManageRules />} />
		// 				<Route path='pending_posts' element={<PendingPosts />} />
		// 			</Route>
		// 			<Route path='profile/:username' element={<UserProfile />} />

		// 			<Route path='settings' element={<Settings />} />

		// 			<Route path='posts/:postId' element={<PostView />} />
		// 		</Route>
		// 	</Route>

		// 	<Route element={<CenterLayout className='px-20 pt-20 overflow-hidden' />}>
		// 		<Route path='auth' element={<GuestWrapper />}>
		// 			<Route path='signin' element={<Login />} />
		// 			<Route path='test' element={<TestContainer />} />
		// 			<Route path='signup' element={<Register />} />
		// 			<Route path='forget-pass' element={<ForgetPass />} />
		// 		</Route>
		// 	</Route>

		// 	<Route path='*' element={<NotFound />} />
		// </Routes>

		<TestContainer />
		// </RootLayout>
	);
}

export default App;
