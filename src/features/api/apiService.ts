import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:8000/api/v1',
	prepareHeaders: async (headers, { getState }) => {
		const access_token = (getState() as RootState).auth.access_token;
		const auth = JSON.parse(localStorage.getItem('auth') || '{}');

		headers.set('Authorization', access_token ?? auth?.access_token);

		return headers;
	},
});

export const apiService = createApi({
	reducerPath: 'api',
	baseQuery: async (args, api, extraOptions) => {
		const result = await baseQuery(args, api, extraOptions);

		if (result?.error?.status === 401 || result.error?.status === 404) {
			api.dispatch(userLoggedOut());
			localStorage.clear();
			console.log('clearning', result);
		}
		return result;
	},
	endpoints: () => ({}),
	tagTypes: ['user', 'user_posts'],
});
