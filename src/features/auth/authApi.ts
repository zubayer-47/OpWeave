import { apiService } from '../api/apiService';
import { updateUser } from './authSlice';

export const authApi = apiService.injectEndpoints({
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
						updateUser({
							access_token: data.access_token,
							user: data.user,
						})
					);
				} catch (err) {
					//
				}
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
						updateUser({
							access_token: data.access_token,
							user: data.user,
						})
					);
				} catch (err) {
					//
				}
			},
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
