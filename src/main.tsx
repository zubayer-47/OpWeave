import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import { store } from './app/store.ts';
import ErrorBoundary from './components/errors/ErrorBoundary.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<HashRouter>
				<Provider store={store}>
					<Toaster />
					<App />
				</Provider>
			</HashRouter>
		</ErrorBoundary>
	</React.StrictMode>
);
