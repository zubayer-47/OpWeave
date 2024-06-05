import { MemberRole } from '../community/types';

export type Post = {
	post_id: string;
	community_id: string;
	member_id: string;
	body: string;
	createdAt: string;
	updatedAt: string;
	image_url: string;
	community: {
		name: string;
	};
	member: {
		user: {
			fullname: string;
			username: string;
			avatar: string;
		};
	};
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

export type PendingPostRes = { posts: PendingPost[]; role: MemberRole };
