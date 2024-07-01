/* eslint-disable no-mixed-spaces-and-tabs */
import { apiService } from '../api/apiService';
import {
	Comment,
	CommentCreationPayload,
	CommentCreationRes,
	CommentReplyCreationPayload,
	CommentReplyCreationResType,
	CommentsRes,
} from './types';

export const commentApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		createComment: builder.mutation<CommentCreationRes, CommentCreationPayload>(
			{
				query: ({ post_id, ...payload }) => ({
					url: `/comments/post/${post_id}`,
					method: 'POST',
					body: payload,
				}),

				invalidatesTags: ['Comments'],
			}
		),

		createCommentReply: builder.mutation<
			CommentReplyCreationResType,
			CommentReplyCreationPayload
		>({
			query: ({ comment_id, ...payload }) => ({
				url: `/comments/${comment_id}/reply`,
				method: 'POST',
				body: payload,
			}),

			invalidatesTags: ['Replies'],
		}),

		getComments: builder.query<CommentsRes, string>({
			query: (post_id) => `/comments/post/${post_id}`,
			providesTags: ['Comments'],
		}),

		getCommentReplies: builder.query<
			{ replies: Omit<Comment, 'replyCount'>[] },
			string
		>({
			query: (comment_id) => `/comments/${comment_id}/reply`,
			providesTags: ['Replies'],
		}),

		deleteComment: builder.mutation<{ message: string }, string>({
			query: (comment_id) => ({
				url: `comments/${comment_id}`,
				method: 'DELETE',
			}),

			// async onQueryStarted(comment_id, { dispatch, queryFulfilled }) {
			// 	const patchRes = dispatch(
			// 		commentApi.util.updateQueryData(
			// 			'getCommentReplies',
			// 			comment_id,
			// 			(draft) => {
			// 				console.log(comment_id, draft.replies);
			// 				const replies = draft.replies.filter(
			// 					(reply) => reply.comment_id !== comment_id
			// 				);

			// 				console.log(replies);

			// 				return {
			// 					replies: replies,
			// 				};
			// 			}
			// 		)
			// 	);

			// 	try {
			// 		await queryFulfilled;
			// 	} catch (error) {
			// 		patchRes.undo();
			// 	}
			// },
		}),
	}),
});

export const {
	useCreateCommentMutation,
	useCreateCommentReplyMutation,
	useGetCommentsQuery,
	useGetCommentRepliesQuery,
	useDeleteCommentMutation,
} = commentApi;
