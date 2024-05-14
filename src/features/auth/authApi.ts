/* eslint-disable no-mixed-spaces-and-tabs */
import { apiService } from '../api/apiService';
import { updateUser } from './authSlice';
import { UserStateType } from './types';

export const authApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (data) => ({
				url: '/auth/signup',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: (res) =>
				res
					? [
							{ type: 'User', id: res.user?.id },
							{ type: 'Communities', id: 'List' },
							{ type: 'Community_posts', id: 'List' },
							{ type: 'Feed', id: 'List' },
							{ type: 'User_assigned_communities', id: 'List' },
							{ type: 'User_posts', id: 'List' },
							'Community',
					  ]
					: [],
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
		login: builder.mutation<
			UserStateType,
			{
				username: FormDataEntryValue | null;
				password: FormDataEntryValue | null;
			}
		>({
			query: (data) => ({
				url: '/auth/signin',
				method: 'POST',
				body: data,
			}),

			invalidatesTags: (res) =>
				res
					? [
							{ type: 'User', id: res.user?.id },
							{ type: 'Communities', id: 'List' },
							{ type: 'Community_posts', id: 'List' },
							{ type: 'Feed', id: 'List' },
							{ type: 'User_assigned_communities', id: 'List' },
							{ type: 'User_posts', id: 'List' },
							'Community',
					  ]
					: [],
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
