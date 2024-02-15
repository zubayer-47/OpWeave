import { Outlet, Route, Routes } from 'react-router-dom';
import EmptyScreen from './components/EmptyScreen';
import RootLayout from './layouts/RootLayout';
import Bookmarks from './pages/bookmarks/Bookmarks';
import Communities from './pages/communities/Communities';
import Home from './pages/home/Home';
import Notification from './pages/notification/Notification';

function App() {
	return (
		<RootLayout>
			<Routes>
				<Route path='/' element={<Outlet />}>
					<Route index element={<Home />} />
					<Route path='explore' element={<EmptyScreen />} />
					<Route path='notifications' element={<Notification />} />
					<Route path='communities' element={<Communities />} />
					<Route path='bookmarks' element={<Bookmarks />} />
					<Route path='profile' element={<EmptyScreen />} />
				</Route>
			</Routes>
		</RootLayout>
	);
}

export default App;
