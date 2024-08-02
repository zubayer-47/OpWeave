import { SpeedInsights } from '@vercel/speed-insights/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import { store } from './app/store.ts';
import ErrorBoundary from './components/errors/ErrorBoundary.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<DndProvider backend={HTML5Backend}>
			<ErrorBoundary>
				<HashRouter>
					<Provider store={store}>
						<Toaster />
						<App />
						<SpeedInsights />
					</Provider>
				</HashRouter>
			</ErrorBoundary>
		</DndProvider>
	</React.StrictMode>
);
