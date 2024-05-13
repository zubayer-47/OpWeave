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
		getCommunity: builder.query<Community, string>({
			query: (communityId) => `/communities/${communityId}`,

			// async onQueryStarted(_, { dispatch, queryFulfilled }) {
			// 	try {
			// 		const res = await queryFulfilled;

			// 		console.log({
			// 			res: res.meta?.response?.headers.get('Content-Type'),
			// 		});
			// 	} catch (error) {
			// 		//
			// 	}
			// },

			transformResponse: async (res: Community, meta) => {
				console.log(meta?.response?.headers.get('X-Total-Post-Count'));

				return res;
			},
		}),
		getUserCommunities: builder.query<{ communities: Community[] }, void>({
			query: () => '/communities/assigned',

			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const res = await queryFulfilled;
					console.log('res :', res.data);
				} catch (error) {
					//
				}
			},
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

export const {
	useGetCommunitiesQuery,
	useGetCommunityQuery,
	useGetUserCommunitiesQuery,
	useCreateCommunityMutation,
} = communityApi;
