import { Comment } from '../comment/types';
import { MemberRole } from '../community/types';

export type Post = {
	post_id: string;
	community_id: string;
	member_id: string;
	body: string;
	image_url?: string;
	image_height?: number;
	createdAt: string;
	updatedAt: string;
	community: {
		name: string;
		members?: { role: MemberRole }[];
	};
	reacts: { react_type: 'LIKE' | 'UNLIKE' }[];
	reactCount: number;
	comments: Comment[];
	member: {
		user: {
			user_id: string;
			fullname: string;
			username: string;
			avatar: string;
		};
	};
	_count: { reacts: number; comments: number };
	// these two only comes with feed posts that's why they are optional
	hasAccess?: boolean;
	hasJoined?: boolean;
};

export type FeedResType = {
	posts: Post[];
	hasMore: boolean;
	totalCount: number;
};

export type CommunityPostsResType = {
	posts: Post[];
	hasMore: boolean;
	totalCount: number;
	totalPendingPost: number;
};

export type PostCommunityIdType = { community_id: string; post_id: string };

export type PendingPost = {
	post_id: string;
	community_id: string;
	body: string;
	image_url: string | null;
	member: {
		member_id: string;
		user: {
			user_id: string;
			fullname: string;
			avatar: string;
		};
	};
};

export type PostReactResType = {
	message: string;
	count: number;
};

export type PendingPostRes = { posts: PendingPost[]; role: MemberRole };
