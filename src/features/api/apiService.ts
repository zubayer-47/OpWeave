import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { userLoggedOut } from '../auth/authSlice';

const baseQuery = retry(
	fetchBaseQuery({
		baseUrl: 'http://localhost:8000/api/v1',
		prepareHeaders: async (headers, { getState }) => {
			const access_token = (getState() as RootState).auth.access_token;
			const auth = JSON.parse(localStorage.getItem('auth') || '{}');

			headers.set('Authorization', access_token ?? auth?.access_token);

			return headers;
		},
	})
	// {
	// 	maxRetries: 3,
	// }
);

export const apiService = createApi({
	reducerPath: 'api',
	baseQuery: async (args, api, extraOptions) => {
		const result = await baseQuery(args, api, extraOptions);

		if ('error' in result) {
			if (result?.error?.status === 401 || result.error?.status === 404) {
				api.dispatch(userLoggedOut());
				localStorage.clear();
				console.log('clearning', result);
			}
		} else if ('data' in result) {
			console.log(result?.meta?.response?.headers.get('x-xss-protection'));
		}
		return result;
	},
	keepUnusedDataFor: 30,
	endpoints: () => ({}),
	tagTypes: [
		'User',
		'User_posts',
		'Community_posts',
		'Communities',
		'User_assigned_communities',
		'Community',
		'Communities',
		'Feed',
		'Pending_posts',
		// 'Post',
	],
});
