/* eslint-disable no-mixed-spaces-and-tabs */
import { apiService } from '../api/apiService';
import { communityApi } from '../community/communityApi';
import { postApi } from '../post/postApi';
import {
	CreateRulePayloadType,
	CreateRuleResultType,
	DeleteRuleResultType,
	PostActionParams,
	PostActionRes,
	UpdateRulesOrderPayloadType,
	UpdateRulesOrderResultType,
} from './types';

export const authorityApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		approvePost: builder.mutation<PostActionRes, PostActionParams>({
			query: ({ community_id, post_id }) => ({
				url: `/authority/approve/${post_id}`,
				method: 'POST',
				body: {
					community_id,
				},
			}),

			invalidatesTags: [{ type: 'Community_posts', id: 'List' }],

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

			async onQueryStarted({ community_id }, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;

					console.log(res);

					dispatch(
						communityApi.util.updateQueryData(
							'getCommunityRules',
							community_id,
							(draft) => {
								const rules = [...draft.rules];

								rules.push(res.data.rule);

								return {
									...draft,
									rules,
								};
							}
						)
					);
				} catch (error) {
					//
				}
			},
		}),

		deleteRule: builder.mutation<
			DeleteRuleResultType,
			{ rule_id: string; community_id: string }
		>({
			query: ({ rule_id, community_id }) => ({
				url: `/authority/rules/${community_id}/${rule_id}`,
				method: 'DELETE',
			}),

			async onQueryStarted(
				{ rule_id, community_id },
				{ dispatch, queryFulfilled }
			) {
				const patchResult = dispatch(
					communityApi.util.updateQueryData(
						'getCommunityRules',
						community_id,
						(draft) => {
							const rules = draft.rules.filter((r) => r.rule_id !== rule_id);

							return { rules };
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

		reorderRules: builder.mutation<
			UpdateRulesOrderResultType,
			UpdateRulesOrderPayloadType
		>({
			query: (payload) => ({
				url: '/authority/rules/reorder',
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
	useDeleteRuleMutation,
	useReorderRulesMutation,
} = authorityApi;
