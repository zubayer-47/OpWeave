/* eslint-disable no-mixed-spaces-and-tabs */
import toast from 'react-hot-toast';
import { apiService } from '../api/apiService';
import {
	CommunityPostsResType,
	FeedResType,
	PendingPost,
	PendingPostRes,
	Post,
	PostCommunityIdType,
	PostReactResType,
} from './types';

export const postApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getPost: builder.query<Post, string>({
			query: (post_id) => ({
				url: `/communities/posts/${post_id}`,
			}),

			transformErrorResponse(res) {
				if (res.status === 403) {
					toast.error("you don't have permission to access this resource");
				}

				return res;
			},

			// providesTags: (res, _err, args) =>
			// 	res ? ['Post', { type: 'Post', id: args.post_id }] : ['Post'],
		}),

		getUserPosts: builder.query<
			FeedResType,
			{ username: string; page?: number }
		>({
			query: ({ username, page = 1 }) =>
				`/users/${username}/posts?page=${page}`,

			transformResponse(res: FeedResType, meta) {
				const totalCountString = meta?.response?.headers.get('X-Total-Count');
				const totalCount = totalCountString
					? parseInt(totalCountString, 10)
					: 0;

				return { ...res, totalCount };
			},

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

		getFeedPosts: builder.query<FeedResType, number | void>({
			query: (page = 1) => `/communities/posts/feed?page=${page}`,

			transformResponse(res: FeedResType, meta) {
				const totalCountString = meta?.response?.headers.get('X-Total-Count');
				const totalCount = totalCountString
					? parseInt(totalCountString, 10)
					: 0;

				return { ...res, totalCount };
			},

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
				'Current_user_pending_posts',
			],

			async transformErrorResponse(error) {
				if (error.status === 403) {
					const message = (error.data as { message: string })?.message;
					toast.error(message || "You're not allowed to react this post!");
				}

				return error;
			},
		}),

		postReact: builder.mutation<
			PostReactResType,
			{ community_id: string; post_id: string }
		>({
			query: (payload) => ({
				url: '/communities/posts/react',
				method: 'POST',
				body: payload,
			}),

			async onQueryStarted(
				{ post_id, community_id },
				{ dispatch, queryFulfilled }
			) {
				const feedPostsPatchResult = dispatch(
					postApi.util.updateQueryData('getFeedPosts', undefined, (draft) => {
						const modifiedPostsDraft = draft.posts.map(
							(post): Post =>
								post.post_id === post_id
									? {
											...post,
											reacts: post.reacts?.length
												? [
														{
															react_type:
																post.reacts[0].react_type === 'LIKE'
																	? 'UNLIKE'
																	: 'LIKE',
														},
												  ]
												: [{ react_type: 'LIKE' }],
									  }
									: post
						);

						return {
							...draft,
							posts: modifiedPostsDraft,
						};
					})
				);

				const communityPostsPatchRes = dispatch(
					postApi.util.updateQueryData(
						'getCommunityPosts',
						{ community_id },
						(draft) => ({
							...draft,
							posts: draft.posts.map((post) =>
								post.post_id === post_id
									? {
											...post,
											reacts: post.reacts?.length
												? [
														{
															react_type:
																post.reacts[0].react_type === 'LIKE'
																	? 'UNLIKE'
																	: 'LIKE',
														},
												  ]
												: [{ react_type: 'LIKE' }],
									  }
									: post
							),
						})
					)
				);

				const postViewPatchResult = dispatch(
					postApi.util.updateQueryData('getPost', post_id, (draft) => ({
						...draft,
						reacts:
							draft.reacts?.length && draft.reacts[0].react_type === 'LIKE'
								? [{ react_type: 'UNLIKE' }]
								: [{ react_type: 'LIKE' }],
					}))
				);

				try {
					await queryFulfilled;
				} catch (error) {
					// if ('status' in error) {
					// 	console.log(error.status);
					// }
					feedPostsPatchResult.undo();
					communityPostsPatchRes.undo();
					postViewPatchResult.undo();
				}
			},

			async transformErrorResponse(error) {
				if (error.status === 403) {
					const message = (error.data as { message: string })?.message;
					toast.error(message || "You're not allowed to react this post!");
				}

				return error;
			},
		}),

		deletePost: builder.mutation<
			{
				message: string;
				postId: string;
			},
			PostCommunityIdType
		>({
			query: ({ community_id, post_id }) => ({
				url: `/communities/${community_id}/posts/${post_id}`,
				method: 'DELETE',
			}),

			async onQueryStarted(
				{ post_id, community_id },
				{ dispatch, queryFulfilled }
			) {
				try {
					await queryFulfilled;

					dispatch(
						postApi.util.updateQueryData(
							'getCurrentUserPendingPosts',
							community_id,
							(draft) => ({
								...draft,
								posts: draft.posts.filter((p) => p.post_id !== post_id),
							})
						)
					);

					dispatch(
						postApi.util.updateQueryData(
							'getFeedPosts',
							undefined,
							(draft) => ({
								...draft,
								posts: draft.posts.filter((p) => p.post_id !== post_id),
							})
						)
					);

					dispatch(
						postApi.util.updateQueryData(
							'getCommunityPosts',
							{ community_id },
							(draft) => ({
								...draft,
								posts: draft.posts.filter((p) => p.post_id !== post_id),
							})
						)
					);

					dispatch(
						postApi.util.updateQueryData(
							'getPendingPosts',
							community_id,
							(draft) => ({
								...draft,
								posts: draft.posts.filter((p) => p.post_id !== post_id),
							})
						)
					);
				} catch (error) {
					//
				}
			},
		}),

		getCommunityPosts: builder.query<
			CommunityPostsResType,
			{ community_id: string; page?: number }
		>({
			query: ({ community_id, page = 1 }) =>
				`/communities/${community_id}/posts?page=${page}`,

			transformResponse(res: CommunityPostsResType, meta) {
				const totalCountString = meta?.response?.headers.get('X-Total-Count');
				const totalCount = totalCountString
					? parseInt(totalCountString, 10)
					: 0;

				return { ...res, totalCount };
			},

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

		getCurrentUserPendingPosts: builder.query<
			{ posts: PendingPost[]; total: number },
			string
		>({
			query: (community_id) => `/communities/${community_id}/me/pending/posts`,
			providesTags: ['Current_user_pending_posts'],
		}),
	}),
});

export const {
	useGetPostQuery,
	useGetUserPostsQuery,
	useGetFeedPostsQuery,
	useLazyGetFeedPostsQuery,
	useCreatePostMutation,
	usePostReactMutation,
	useDeletePostMutation,
	useGetCommunityPostsQuery,
	useLazyGetCommunityPostsQuery,
	useGetPendingPostsQuery,
	useGetCurrentUserPendingPostsQuery,
} = postApi;
