import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import ErrorBoundary from './components/errors/ErrorBoundary.tsx';
import { ThemeProvider } from './contexts/theme/ThemeProvider.tsx';
import UserProvider from './contexts/user/Provider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<HashRouter>
				<ThemeProvider>
					<UserProvider>
						<App />
					</UserProvider>
				</ThemeProvider>
			</HashRouter>
		</ErrorBoundary>
	</React.StrictMode>
);
