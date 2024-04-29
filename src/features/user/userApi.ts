/* eslint-disable no-empty */
import { apiService } from '../api/apiService';
import { updateUser } from '../auth/authSlice';
import { User } from '../auth/types';

const userApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => '/users',

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

		updateUser: builder.mutation<void, Pick<User, 'id'> & Partial<User>>({
			query: ({ id, ...payload }) => ({
				url: `/users/${id}`,
				method: 'PATCH',
				body: payload,
			}),

			async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;

					dispatch(
						apiService.util.updateQueryData('getUser', undefined, (draft) => {
							console.log({ draft });
						})
					);
				} catch (error) {}
			},

			// TODO: 26/4 work with this
		}),

		getProfilePicture: builder.query<string, number>({
			query: (userId) => ({
				url: `/users/${userId}/profilePicture`,
			}),
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
					dispatch(apiService.util.updateQueryData(''));
				} catch (error) {}
			},
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
	useGetProfilePictureQuery,
	useUpdateProfilePictureMutation,
	useRemoveProfilePictureMutation,
} = userApi;
