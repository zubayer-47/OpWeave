import { apiService } from '../api/apiService';
import { Community } from './types';

export const communityApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getCommunities: builder.query<Community[] | null, void>({
			query: () => '/communities',

			transformResponse: (response: { communities: Community[] }, meta) => {
				if (meta?.response?.status === 200) {
					return response.communities;
				}

				return null;
			},
		}),
		getCommunity: builder.query({
			query: (communityId) => `/communities/${communityId}`,
		}),
		createCommunity: builder.mutation<Community, unknown>({
			query: (payload) => ({
				url: '/communities',
				method: 'POST',
				body: payload,
			}),
		}),
	}),
});

export const { useGetCommunitiesQuery, useCreateCommunityMutation } =
	communityApi;
