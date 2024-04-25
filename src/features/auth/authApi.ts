import { apiService } from '../api/apiService';
import { add } from './authSlice';
import { User } from './types';

const authApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (credentials) => ({
				url: '/signup',
				method: 'POST',
				body: credentials,
			}),

			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const data = (await queryFulfilled) as unknown as User;

					console.log(data);

					localStorage.setItem('access_token', JSON.stringify(data.token));
					dispatch(add(data));

					// eslint-disable-next-line no-empty
				} catch (err) {}
			},
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: '/signin',
				method: 'POST',
				body: credentials,
			}),

			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const data = (await queryFulfilled) as unknown as User;

					console.log(data);

					localStorage.setItem('access_token', JSON.stringify(data.token));
					dispatch(add(data));

					// eslint-disable-next-line no-empty
				} catch (err) {}
			},
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
