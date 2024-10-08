/* eslint-disable no-mixed-spaces-and-tabs */
import toast from 'react-hot-toast';
import { apiService } from '../api/apiService';
import { postApi } from '../post/postApi';
import { Post } from '../post/types';
import { leave } from './communitySlice';
import {
	CommunitiesResType,
	Community,
	CommunityItemResType,
	CommunityLogoResType,
	CommunityRulesType,
	FilterBy,
	GuestCommunityViewType,
	LeaveCommunityResType,
	MembersResType,
} from './types';

export const communityApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getCommunity: builder.query<Community | GuestCommunityViewType, string>({
			query: (communityId) => `/communities/${communityId}`,
			providesTags: (_res, _err, args) => [
				{ type: 'Community', id: args },
				'Community',
			],

			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled;

					// if ((res.data as Community)?.role) {
					// 	dispatch(join());
					// }

					if ((res.data as GuestCommunityViewType)?.message) {
						dispatch(leave());
					}
				} catch (error) {
					//
				}
			},
		}),

		getCommunities: builder.query<
			CommunitiesResType,
			{ page?: number; limit?: number }
		>({
			query: ({ page, limit }) => ({
				url:
					page || (page && limit)
						? `/communities?page=${page}&limit=${limit}`
						: '/communities',
			}),
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

		getUserProfileCommunities: builder.query<CommunitiesResType, string>({
			query: (username) => `/communities/${username}/assigned`,
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
			providesTags: [{ type: 'Rule', id: 'List' }],
		}),

		getMembers: builder.query<
			MembersResType,
			{
				community_id: string | symbol;
				page?: number;
				limit?: number;
				filterBy?: FilterBy;
			}
		>({
			query: ({ community_id, page = 1, limit = 10, filterBy = 'all' }) =>
				`/communities/${community_id.toString()}/members?page=${page}&limit=${limit}&filterBy=${filterBy}`,

			transformResponse(res: MembersResType, meta) {
				const totalCountString = meta?.response?.headers.get('X-Total-Count');
				const totalCount = totalCountString
					? parseInt(totalCountString, 10)
					: 0;

				return { ...res, totalCount };
			},
		}),

		joinMember: builder.mutation<
			CommunityItemResType & { message: string },
			string
		>({
			query: (community_id) => ({
				url: `/communities/${community_id}/members`,
				method: 'POST',
			}),

			invalidatesTags: [
				'Community',
				{ type: 'Community_posts', id: 'List' },
				{ type: 'Feed', id: 'List' },
				{ type: 'Communities', id: 'List' },
			],

			async onQueryStarted(community_id, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					postApi.util.updateQueryData('getFeedPosts', undefined, (draft) => ({
						...draft,
						posts: draft.posts.map(
							(post): Post =>
								post.community_id === community_id
									? { ...post, hasAccess: true }
									: post
						),
					}))
				);

				try {
					const res = await queryFulfilled;

					// dispatch(join());

					dispatch(
						communityApi.util.updateQueryData('getCommunities', {}, (draft) => {
							const updatedDraft = draft.communities.filter(
								(d) => d.community_id !== community_id
							);

							return { communities: updatedDraft };
						})
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
					patchResult.undo();
				}
			},

			async transformErrorResponse(error) {
				if (error.status === 403) {
					const message = (error.data as { message: string })?.message;
					toast.error(message || "You're not allowed to Join!");
				}

				return error;
			},
		}),

		leaveMember: builder.mutation<LeaveCommunityResType, string>({
			query: (community_id) => ({
				url: `/communities/${community_id}/members`,
				method: 'DELETE',
			}),
			invalidatesTags: [
				'Community',
				{ type: 'Communities', id: 'List' },
				{ type: 'Community_posts', id: 'List' },
				{ type: 'Feed', id: 'List' },
			],

			async onQueryStarted(community_id, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					communityApi.util.updateQueryData(
						'getCommunity',
						community_id,
						(draft) => {
							const guestView: GuestCommunityViewType = {
								community_id: draft.community_id,
								name: draft.name,
								bio: draft.bio,
								description: draft.description,
								avatar: draft.avatar,
								createdAt: draft.createdAt,
								message: 'you do not have permission to access this route',
							};

							return guestView;
						}
					)
				);

				dispatch(leave());

				try {
					await queryFulfilled;
				} catch (error) {
					patchResult.undo();
					// dispatch(join());
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

		updateCommunityLogo: builder.mutation<
			CommunityLogoResType,
			{ community_id: string; formData: FormData }
		>({
			query: ({ community_id, formData }) => ({
				url: `/communities/${community_id}/logo`,
				method: 'PATCH',
				body: formData,
			}),
		}),
	}),
});

export const {
	useGetCommunityQuery,
	useGetCommunitiesQuery,
	useGetUserAssignedCommunitiesQuery,
	useGetUserProfileCommunitiesQuery,
	useCreateCommunityMutation,
	useGetCommunityRulesQuery,
	useGetMembersQuery,
	useLazyGetMembersQuery,
	useJoinMemberMutation,
	useLeaveMemberMutation,
	useUpdateCommunityLogoMutation,
} = communityApi;
