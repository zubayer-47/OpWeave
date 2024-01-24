import { Outlet, Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/home/Home';

function App() {
	return (
		<RootLayout>
			<Routes>
				<Route path='/' element={<Outlet />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</RootLayout>
	);
}

export default App;
