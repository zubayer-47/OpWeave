import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { remove } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:8000/api/v1',
	prepareHeaders: async (headers, { getState }) => {
		const token = (getState() as RootState).auth.user?.token;
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
});

export const apiService = createApi({
	reducerPath: 'api',
	baseQuery: async (args, api, extraOptions) => {
		const result = await baseQuery(args, api, extraOptions);

		if (result?.error?.status === 401) {
			api.dispatch(remove());
			localStorage.clear();
		}
		return result;
	},
	endpoints: () => ({}),
});
