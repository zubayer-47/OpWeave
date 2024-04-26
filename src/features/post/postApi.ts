import { apiService } from '../api/apiService';

const postApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getUserPosts: builder.query({
			query: (userId) => `/users/${userId}/posts`,
			// TODO: 26/4
		}),
	}),
});

export const { useGetUserPostsQuery } = postApi;
