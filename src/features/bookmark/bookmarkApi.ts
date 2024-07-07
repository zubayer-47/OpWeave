/* eslint-disable no-mixed-spaces-and-tabs */
import { apiService } from '../api/apiService';
import { Bookmark, BookmarkQueryResType } from './types';

export const bookmarkApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getBookmarks: builder.query<BookmarkQueryResType, string>({
			query: (userId) => `/posts/bookmarks/${userId}`,

			transformResponse(res: BookmarkQueryResType, meta) {
				const totalCountString = meta?.response?.headers.get('X-Total-Count');
				const totalCount = totalCountString
					? parseInt(totalCountString, 10)
					: 0;

				return { ...res, totalCount };
			},

			providesTags: (res) =>
				res
					? [
							'Bookmarks',
							...res.bookmarks.map(({ bookmark_id }) => ({
								type: 'Bookmarks' as const,
								bookmark_id,
							})),
					  ]
					: ['Bookmarks'],
		}),

		createBookmark: builder.mutation<Bookmark, string>({
			query: (post_id) => {
				// const user_id = store.getState().auth.user?.id
				return {
					url: '/posts/bookmarks',
					method: 'POST',
					body: { post_id },
				};
			},

			invalidatesTags: ['Bookmarks'],
		}),

		deleteBookmark: builder.mutation<
			{ message: string; bookmark_id: string },
			string
		>({
			query: (bookmark_id) => ({
				url: `/bookmarks/${bookmark_id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Bookmarks'],
		}),
	}),
});

export const {
	useGetBookmarksQuery,
	useCreateBookmarkMutation,
	useDeleteBookmarkMutation,
} = bookmarkApi;
