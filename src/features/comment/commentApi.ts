/* eslint-disable no-mixed-spaces-and-tabs */
import { apiService } from '../api/apiService';
import {
	CommentCreationPayload,
	CommentCreationRes,
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
			}
		),

		getComments: builder.query<CommentsRes, string>({
			query: (post_id) => `/comments/post/${post_id}`,
		}),
	}),
});

export const { useCreateCommentMutation, useGetCommentsQuery } = commentApi;
