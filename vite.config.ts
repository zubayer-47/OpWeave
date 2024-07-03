import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		compression({
			algorithm: 'gzip',
		}),
		compression({
			algorithm: 'brotliCompress',
		}),
	],
});
