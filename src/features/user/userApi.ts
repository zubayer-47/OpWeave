/* eslint-disable no-empty */
import { apiService } from '../api/apiService';
import { addProfilePicture } from '../auth/authSlice';

const userApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getProfilePicture: builder.query({
			query: (userId) => ({
				url: `/users/${userId}/profilePicture`,
			}),

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					if (data) {
						dispatch(addProfilePicture(data.avatar));
					}
				} catch (error) {}
			},
		}),

		updateProfilePicture: builder.mutation({
			query: ({ userId, payload }) => ({
				url: `/users/${userId}/profilePicture`,
				method: 'PUT',
				body: payload,
			}),

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					if (data) {
						dispatch(addProfilePicture(data.avatar));
					}
				} catch (error) {}
			},
		}),

		removeProfilePicture: builder.mutation({
			query: (userId) => ({
				url: `/users/${userId}/profilePicture`,
				method: 'DELETE',
			}),
		}),

		getUserProfile: builder.query({
			query: () => '/users',
		}),

		updateUser: builder.mutation({
			query: ({ userId, payload }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: payload,
			}),

			// TODO: 26/4 work with this
		}),
	}),
});

export const {
	useGetProfilePictureQuery,
	useUpdateProfilePictureMutation,
	useRemoveProfilePictureMutation,
	useGetUserProfileQuery,
	useUpdateUserMutation,
} = userApi;
