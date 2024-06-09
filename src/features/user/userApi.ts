/* eslint-disable no-empty */
import { apiService } from '../api/apiService';
import { updateUser } from '../auth/authSlice';
import { User } from '../auth/types';
import { UserProfileType, UserUpdatePayload } from './types';

export const userApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
			query: () => '/users',
			providesTags: (res) =>
				res ? [{ type: 'User', id: res.id }, 'User'] : ['User'],

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

		getUserProfile: builder.query<UserProfileType, string>({
			query: (userId) => `/users/${userId}`,
		}),

		updateUser: builder.mutation<
			User,
			Pick<User, 'id'> & Partial<UserUpdatePayload>
		>({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			query: ({ id, ...payload }) => ({
				url: `/users`,
				method: 'PATCH',
				body: payload,
			}),
			invalidatesTags: (_res, _err, args) => [{ type: 'User', id: args.id }],
		}),

		// getProfilePicture: builder.query<{ avatar: string }, string>({
		// 	query: (userId) => ({
		// 		url: `/users/${userId}/profilePicture`,
		// 	}),
		// 	providesTags: ['profile_picture'],
		// }),

		updateProfilePicture: builder.mutation<string, FormData>({
			query: (payload) => ({
				url: `/users/profilePicture`,
				method: 'PUT',
				body: payload,
			}),
			invalidatesTags: ['User'],
		}),

		removeProfilePicture: builder.mutation({
			query: () => ({
				url: `/users/profilePicture`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetUserProfileQuery,
	useUpdateUserMutation,
	useUpdateProfilePictureMutation,
	useRemoveProfilePictureMutation,
} = userApi;
