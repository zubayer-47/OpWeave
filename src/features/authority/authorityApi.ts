/* eslint-disable no-mixed-spaces-and-tabs */
import { apiService } from '../api/apiService';
import { postApi } from '../post/postApi';
import {
	CreateRulePayloadType,
	CreateRuleResultType,
	PostActionParams,
	PostActionRes,
	UpdateRulesOrderPayloadType,
	UpdateRulesOrderResultType,
} from './types';

const authorityApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		approvePost: builder.mutation<PostActionRes, PostActionParams>({
			query: ({ community_id, post_id }) => ({
				url: `/authority/approve/${post_id}`,
				method: 'POST',
				body: {
					community_id,
				},
			}),

			async onQueryStarted(
				{ community_id, post_id },
				{ dispatch, queryFulfilled }
			) {
				const patchResult = dispatch(
					postApi.util.updateQueryData(
						'getPendingPosts',
						community_id,
						(draft) => {
							return {
								...draft,
								posts: draft.posts.filter((p) => p.post_id !== post_id),
							};
						}
					)
				);
				try {
					await queryFulfilled;
				} catch (error) {
					patchResult.undo();
				}
			},
		}),
		rejectPost: builder.mutation<PostActionRes, PostActionParams>({
			query: (args) => ({
				url: `/authority/reject`,
				method: 'DELETE',
				params: {
					postId: args.post_id,
					communityId: args.community_id,
				},
			}),

			async onQueryStarted(
				{ community_id, post_id },
				{ dispatch, queryFulfilled }
			) {
				const patchResult = dispatch(
					postApi.util.updateQueryData(
						'getPendingPosts',
						community_id,
						(draft) => {
							return {
								...draft,
								posts: draft.posts.filter((p) => p.post_id !== post_id),
							};
						}
					)
				);
				try {
					await queryFulfilled;
				} catch (error) {
					patchResult.undo();
				}
			},
		}),

		createRule: builder.mutation<CreateRuleResultType, CreateRulePayloadType>({
			query: ({ title, body, community_id }) => ({
				url: 'authority/rules',
				method: 'POST',
				body: {
					title,
					body,
					community_id,
				},
			}),
		}),

		updateRulesOrder: builder.mutation<
			UpdateRulesOrderResultType,
			UpdateRulesOrderPayloadType
		>({
			query: (payload) => ({
				url: '/authority/rules/order',
				method: 'PATCH',
				body: payload,
			}),
		}),
	}),
});

export const {
	useApprovePostMutation,
	useRejectPostMutation,
	useCreateRuleMutation,
	useUpdateRulesOrderMutation,
} = authorityApi;
