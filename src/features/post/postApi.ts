/* eslint-disable no-mixed-spaces-and-tabs */
import { apiService } from '../api/apiService';
import { PendingPostRes, Post } from './types';

export const postApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getUserPosts: builder.query<{ posts: Post[] }, void>({
			query: () => `/users/posts`,
			// TODO: 26/4

			providesTags: (res) =>
				res
					? [
							{ type: 'User_posts', id: 'List' },
							...res.posts.map(({ post_id }) => ({
								type: 'User_posts' as const,
								post_id,
							})),
					  ]
					: [{ type: 'User_posts', id: 'List' }],
		}),
		getFeedPosts: builder.query<{ posts: Post[] }, void>({
			query: () => `/communities/posts/feed`,
			providesTags: (res) =>
				res
					? [
							{ type: 'Feed', id: 'List' },
							...res.posts.map(({ post_id }) => ({
								type: 'Feed' as const,
								post_id,
							})),
					  ]
					: [{ type: 'Feed', id: 'List' }],
		}),
		createPost: builder.mutation<
			Post,
			{ formData: FormData; community_id: FormDataEntryValue | null }
		>({
			query: ({ community_id, formData }) => ({
				url: `/communities/${community_id}/posts`,
				method: 'POST',
				body: formData,
			}),

			invalidatesTags: [
				{ type: 'User_posts', id: 'List' },
				{ type: 'Community_posts', id: 'List' },
				{ type: 'Feed', id: 'List' },
			],
		}),
		deletePost: builder.mutation<
			{
				message: string;
				postId: string;
			},
			{ community_id: string; post_id: string }
		>({
			query: ({ community_id, post_id }) => ({
				url: `/communities/${community_id}/posts/${post_id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [
				{ type: 'Feed', id: 'List' },
				{ type: 'User_posts', id: 'List' },
				{ type: 'Community_posts', id: 'List' },
				'Pending_posts',
			],
		}),

		getCommunityPosts: builder.query<{ posts: Post[] }, string>({
			query: (community_id) => `/communities/${community_id}/posts`,
			providesTags: (res) =>
				res
					? [
							{ type: 'Community_posts', id: 'List' },
							...res.posts.map(({ post_id }) => ({
								type: 'Community_posts' as const,
								post_id,
							})),
					  ]
					: [{ type: 'Community_posts', id: 'List' }],
		}),

		getPendingPosts: builder.query<PendingPostRes, string>({
			query: (community_id) => `/communities/${community_id}/pending/posts`,
			providesTags: (res, _err, args) =>
				res
					? [{ type: 'Pending_posts', id: args }, 'Pending_posts']
					: ['Pending_posts'],
		}),
	}),
});

export const {
	useGetUserPostsQuery,
	useGetFeedPostsQuery,
	useCreatePostMutation,
	useDeletePostMutation,
	useGetCommunityPostsQuery,
	useGetPendingPostsQuery,
} = postApi;
