/* eslint-disable no-mixed-spaces-and-tabs */
import { apiService } from '../api/apiService';
import { Community, CommunityRulesType } from './types';

export const communityApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getCommunity: builder.query<Community, string>({
			query: (communityId) => `/communities/${communityId}`,
			providesTags: (_res, _err, args) => [
				{ type: 'Community', id: args },
				'Community',
			],
		}),
		getUserAssignedCommunities: builder.query<
			{ communities: Community[] },
			void
		>({
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
		createCommunity: builder.mutation<Community, unknown>({
			query: (payload) => ({
				url: '/communities',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: [
				{ type: 'User_assigned_communities', id: 'List' },
				{ type: 'Community', id: 'List' },
			],
		}),

		getCommunityRules: builder.query<CommunityRulesType, string>({
			query: (communityId) => `communities/${communityId}/rules`,
		}),
	}),
});

export const {
	useGetCommunityQuery,
	useGetUserAssignedCommunitiesQuery,
	useCreateCommunityMutation,
	useGetCommunityRulesQuery,
} = communityApi;
