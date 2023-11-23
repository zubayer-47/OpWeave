import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './Routes/Home/Home';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
}

export default App;
