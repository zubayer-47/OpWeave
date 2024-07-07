import { Post } from '../post/types';

export type Bookmark = {
	bookmark_id: string;
	user_id: string;
	post_id: string;
	createdAt: Date;
};

type bookmarkType = Post & Pick<Bookmark, 'bookmark_id' | 'createdAt'>;

export type BookmarkQueryResType = {
	bookmarks: bookmarkType[];
	hasMore: boolean;
	totalCount: number;
};
