import { apiService } from '../api/apiService';
import { userLoggedIn } from './authSlice';

const authApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (data) => ({
				url: '/auth/signup',
				method: 'POST',
				body: data,
			}),

			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const response = await queryFulfilled;
					const data = response.data;

					localStorage.setItem(
						'auth',
						JSON.stringify({
							access_token: data.access_token,
							user: data.user,
						})
					);

					dispatch(
						userLoggedIn({
							access_token: data.access_token,
							user: data.user,
						})
					);

					// eslint-disable-next-line no-empty
				} catch (err) {}
			},
		}),
		login: builder.mutation({
			query: (data) => ({
				url: '/auth/signin',
				method: 'POST',
				body: data,
			}),

			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const response = await queryFulfilled;
					const data = response.data;

					localStorage.setItem(
						'auth',
						JSON.stringify({
							access_token: data.access_token,
							user: data.user,
						})
					);

					dispatch(
						userLoggedIn({
							access_token: data.access_token,
							user: data.user,
						})
					);

					// eslint-disable-next-line no-empty
				} catch (err) {}
			},
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
