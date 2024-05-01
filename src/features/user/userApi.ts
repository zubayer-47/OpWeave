/* eslint-disable no-empty */
import { apiService } from '../api/apiService';
import { updateUser } from '../auth/authSlice';
import { User } from '../auth/types';
import { UserUpdatePayload } from './types';

export const userApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
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

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;
					const data = res.data as unknown as {
						message: string;
						user: User;
					};

					dispatch(
						userApi.util.updateQueryData('getUser', undefined, (draft) => {
							// console.log(JSON.stringify(draft), 'separate', res.data);
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							draft = data.user;
						})
					);
				} catch (error) {}
			},

			// TODO: 26/4 work with this
		}),

		getProfilePicture: builder.query<{ avatar: string }, string>({
			query: (userId) => ({
				url: `/users/${userId}/profilePicture`,
			}),
		}),

		updateProfilePicture: builder.mutation<
			string,
			{ userId: string; payload: FormData }
		>({
			query: ({ userId, payload }) => ({
				url: `/users/${userId}/profilePicture`,
				method: 'PUT',
				body: payload,
			}),

			async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;

					const data = res.data as unknown as {
						message: string;
						avatar: string;
					};

					dispatch(
						userApi.util.updateQueryData(
							'getProfilePicture',
							userId,
							(draft) => {
								draft.avatar = data.avatar;
							}
						)
					);
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
