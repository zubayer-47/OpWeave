import { Post } from '../post/types';

export type BookmarkType = {
	bookmark_id: string;
	user_id: string;
	post_id: string;
	createdAt: Date;
};

type bookmark = Post & { bookmark_id: string };

export type BookmarkQueryResType = {
	bookmarks: bookmark[];
	hasMore: boolean;
	totalCount: number;
};
