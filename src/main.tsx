import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/errors/ErrorBoundary.tsx';
import { HashRouter } from 'react-router-dom';
import UserProvider from './contexts/user/Provider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<HashRouter>
				<UserProvider>
					<App />
				</UserProvider>
			</HashRouter>
		</ErrorBoundary>
	</React.StrictMode>
);
