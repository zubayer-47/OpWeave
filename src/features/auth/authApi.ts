import { apiService } from '../api/apiService';
import { userApi } from '../user/userApi';

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

					localStorage.setItem('access_token', data.access_token);

					dispatch(
						userApi.util.updateQueryData('getUser', undefined, (draft) => {
							console.log(JSON.stringify(draft));
						})
					);

					// dispatch(
					// 	userLoggedIn({
					// 		access_token: data.access_token,
					// 		user: data.user,
					// 	})
					// );

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

					localStorage.setItem('access_token', data.access_token);

					console.log(data);

					const patch = dispatch(
						userApi.util.updateQueryData('getUser', undefined, (draft) => {
							console.log(JSON.stringify(draft), 'ss');
						})
					);

					console.log(patch);

					// dispatch(
					// 	userLoggedIn({
					// 		access_token: data.access_token,
					// 		user: data.user,
					// 	})
					// );

					// eslint-disable-next-line no-empty
				} catch (err) {}
			},
		}),
	}),
});

// 01727217079
export const { useLoginMutation, useRegisterMutation } = authApi;
