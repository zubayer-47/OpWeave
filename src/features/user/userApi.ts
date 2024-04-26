import { apiService } from '../api/apiService';

const userApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getProfilePicture: builder.query({
			query: (userId) => `/users/${userId}/profilePicture`,
		}),

		updateProfilePicture: builder.mutation({
			query: (userId) => ({
				url: `/users/${userId}/profilePicture`,
				method: 'PUT',
			}),
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
			query: ({ userId, data }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: data,
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
