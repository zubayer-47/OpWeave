import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
	// baseUrl: 'http://localhost:8000/api/v1',
	baseUrl: import.meta.env.VITE_API_URI,
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

		if ('error' in result) {
			// TODO: 22/06
			// const retries = extraOptions?.retries || 0;

			// if (retries < maxRetries) {
			// 	// Retry the request
			// 	const retryResult = await baseQuery(args, api, {
			// 		...extraOptions,
			// 		retries: retries + 1,
			// 	});
			// 	// Return the retry result
			// 	return retryResult;
			// }

			// if (result?.error?.status === 401 || result.error?.status === 404) {
			if (result?.error?.status === 401 || result?.error?.status === 403) {
				api.dispatch(userLoggedOut());
				localStorage.clear();
			}
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
		'Current_user_pending_posts',
		'Rule',
		// 'Post',

		'Comments',
		'Replies',

		'Bookmarks',
	],
});
