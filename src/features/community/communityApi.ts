/* eslint-disable no-mixed-spaces-and-tabs */
import { apiService } from '../api/apiService';
import {
	CommunitiesResType,
	Community,
	CommunityItemResType,
	CommunityRulesType,
	LeaveCommunityResType,
	UnAuthorizedCommunityType,
} from './types';

export const communityApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getCommunity: builder.query<Community | UnAuthorizedCommunityType, string>({
			query: (communityId) => `/communities/${communityId}`,
			providesTags: (_res, _err, args) => [
				{ type: 'Community', id: args },
				'Community',
			],
		}),
		getCommunities: builder.query<CommunitiesResType, void>({
			query: () => `/communities`,
			providesTags: (res) =>
				res
					? [
							{ type: 'Communities', id: 'List' },
							...res.communities.map(({ community_id }) => ({
								type: 'Communities' as const,
								id: community_id,
							})),
					  ]
					: [{ type: 'Communities', id: 'List' }],
		}),
		getUserAssignedCommunities: builder.query<CommunitiesResType, void>({
			query: () => '/communities/assigned',
			providesTags: (res) =>
				res
					? [
							{ type: 'User_assigned_communities', id: 'List' },
							...res.communities.map(({ community_id }) => ({
								type: 'User_assigned_communities' as const,
								id: community_id,
							})),
					  ]
					: [{ type: 'User_assigned_communities', id: 'List' }],
		}),
		createCommunity: builder.mutation<CommunityItemResType, unknown>({
			query: (payload) => ({
				url: '/communities',
				method: 'POST',
				body: payload,
			}),
			// invalidatesTags: [
			// 	{ type: 'User_assigned_communities', id: 'List' },
			// 	{ type: 'Community', id: 'List' },
			// ],

			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;

					dispatch(
						communityApi.util.updateQueryData(
							'getUserAssignedCommunities',
							undefined,
							(draft) => {
								draft.communities.push(res.data);

								return draft;
							}
						)
					);
				} catch (error) {
					//
				}
			},
		}),

		getCommunityRules: builder.query<CommunityRulesType, string>({
			query: (communityId) => `communities/${communityId}/rules`,
		}),

		joinMember: builder.mutation<CommunityItemResType, string>({
			query: (community_id) => ({
				url: `/communities/${community_id}/members`,
				method: 'POST',
			}),

			async onQueryStarted(community_id, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;

					dispatch(
						communityApi.util.updateQueryData(
							'getCommunities',
							undefined,
							(draft) => {
								const updatedDraft = draft.communities.filter(
									(d) => d.community_id !== community_id
								);

								return { communities: updatedDraft };
							}
						)
					);

					dispatch(
						communityApi.util.updateQueryData(
							'getUserAssignedCommunities',
							undefined,
							(draft) => {
								draft.communities.push(res.data);

								return draft;
							}
						)
					);
				} catch (error) {
					//
				}
			},
		}),

		leaveMember: builder.mutation<LeaveCommunityResType, string>({
			query: (community_id) => ({
				url: `/communities/${community_id}/members`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetCommunityQuery,
	useGetCommunitiesQuery,
	useGetUserAssignedCommunitiesQuery,
	useCreateCommunityMutation,
	useGetCommunityRulesQuery,
	useJoinMemberMutation,
	useLeaveMemberMutation,
} = communityApi;
