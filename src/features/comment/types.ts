import { MemberRole } from '../community/types';

export type CommentCreationPayload = {
	post_id: string;
	body: FormDataEntryValue | null;
};

export type CommentCreationRes = {
	message: string;
	comment: {
		comment_id: string;
		body: string;
		createdAt: Date;
		updatedAt: Date;
		member_id: string;
	};
};

export type Comment = {
	comment_id: string;
	post_id: string;
	body: string;
	createdAt: string;
	updatedAt: string;
	parent_comment_id: string;
	member: {
		role: MemberRole;
		member_id: string;
		user: {
			fullname: string;
			avatar: string;
		};
	};
	replyCount: number;
	hasAccess: boolean;
};

export type CommentsRes = {
	comments: Comment[];
	page: number;
	pageSize: number;
	totalComments: number;
};

export type CommentReplyCreationResType = {
	message: string;
	reply: {
		comment_id: string;
		body: string;
		createdAt: string;
		updatedAt: string;
		deletedAt: string | null;
		member_id: string;
		post_id: string;
		parent_comment_id: string;
	};
};

export type CommentReplyCreationPayload = {
	comment_id: string;
	post_id: string;
	body: FormDataEntryValue | null;
};
