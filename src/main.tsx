import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import { store } from './app/store.ts';
import ErrorBoundary from './components/errors/ErrorBoundary.tsx';
import ControllerProvider from './contexts/controller/Provider.tsx';
import ModalProvider from './contexts/modal/Provider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<HashRouter>
				<ControllerProvider>
					<ModalProvider>
						<Provider store={store}>
							<App />
						</Provider>
					</ModalProvider>
				</ControllerProvider>
			</HashRouter>
		</ErrorBoundary>
	</React.StrictMode>
);
