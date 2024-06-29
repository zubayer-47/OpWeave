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
	}),
});

export const {
	useCreateCommentMutation,
	useCreateCommentReplyMutation,
	useGetCommentsQuery,
	useGetCommentRepliesQuery,
} = commentApi;
