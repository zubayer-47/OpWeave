import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:8000/api/v1',
	prepareHeaders: async (headers) => {
		const access_token = localStorage.getItem('access_token');

		if (access_token) {
			headers.set('Authorization', access_token);
		}

		return headers;
	},
});

export const apiService = createApi({
	reducerPath: 'api',
	baseQuery: async (args, api, extraOptions) => {
		const result = await baseQuery(args, api, extraOptions);

		console.log(result);

		if (result?.error?.status === 401) {
			api.dispatch(userLoggedOut());
			localStorage.clear();
			console.log('clearning', result);
		}
		return result;
	},
	endpoints: () => ({}),
	tagTypes: ['user'],
});
