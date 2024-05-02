/* eslint-disable no-empty */
import { apiService } from '../api/apiService';
import { updateUser } from '../auth/authSlice';
import { User } from '../auth/types';
import { UserUpdatePayload } from './types';

export const userApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
			query: () => '/users',
			providesTags: ['user'],

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;
					const data = res.data;

					dispatch(
						updateUser({
							user: data,
						})
					);
				} catch (error) {}
			},
		}),

		updateUser: builder.mutation<
			void,
			Pick<User, 'id'> & {
				payload: UserUpdatePayload;
			}
		>({
			query: ({ id, payload }) => ({
				url: `/users/${id}`,
				method: 'PATCH',
				body: payload,
			}),
			invalidatesTags: ['user'],
		}),

		// getProfilePicture: builder.query<{ avatar: string }, string>({
		// 	query: (userId) => ({
		// 		url: `/users/${userId}/profilePicture`,
		// 	}),
		// 	providesTags: ['profile_picture'],
		// }),

		updateProfilePicture: builder.mutation<
			string,
			{ userId: string; payload: FormData }
		>({
			query: ({ userId, payload }) => ({
				url: `/users/${userId}/profilePicture`,
				method: 'PUT',
				body: payload,
			}),
			invalidatesTags: ['user'],
		}),

		removeProfilePicture: builder.mutation({
			query: (userId) => ({
				url: `/users/${userId}/profilePicture`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetUserQuery,
	useUpdateUserMutation,
	useUpdateProfilePictureMutation,
	useRemoveProfilePictureMutation,
} = userApi;
