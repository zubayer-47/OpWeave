import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:8000/api/v1',
	prepareHeaders: async (headers) => {
		const localAuth = localStorage.getItem('auth');

		if (localAuth) {
			const auth = JSON.parse(localAuth);

			if (auth?.access_token && auth?.user) {
				if (auth) headers.set('Authorization', auth?.access_token);
			}
		}

		return headers;
	},
});

export const apiService = createApi({
	reducerPath: 'api',
	baseQuery: async (args, api, extraOptions) => {
		const result = await baseQuery(args, api, extraOptions);

		if (result?.error?.status === 401) {
			api.dispatch(userLoggedOut());
			localStorage.clear();
			console.log('clearning', result);
		}
		return result;
	},
	endpoints: () => ({}),
	tagTypes: ['profile_picture'],
});
