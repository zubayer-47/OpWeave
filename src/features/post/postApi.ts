import { apiService } from '../api/apiService';
import { Post } from './types';

const postApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getUserPosts: builder.query<{ posts: Post[] }, string>({
			query: (userId) => `/users/${userId}/posts`,
			// TODO: 26/4

			providesTags: ['user_posts'],
		}),
		createPost: builder.mutation<
			Post,
			{ community_id: FormDataEntryValue | null; payload: string }
		>({
			query: ({ community_id, payload }) => ({
				url: `/communities/${community_id}/posts`,
				method: 'POST',
				body: {
					payload,
				},
			}),

			// async onQueryStarted(userId, { dispatch, queryFulfilled }) {
			// 	try {
			// 		const res = await queryFulfilled;
			// 		const data = res.data;

			// 		dispatch(postApi.util.updateQueryData('getUserPosts', userId))
			// 	} catch (error) {
			// 		//
			// 	}
			// },
			invalidatesTags: ['user_posts', 'community_posts'],
		}),

		getCommunityPosts: builder.query<{ posts: Post[] }, string>({
			query: (community_id) => `/communities/${community_id}/posts`,
			providesTags: ['community_posts'],
		}),
	}),
});

export const {
	useGetUserPostsQuery,
	useCreatePostMutation,
	useGetCommunityPostsQuery,
} = postApi;
