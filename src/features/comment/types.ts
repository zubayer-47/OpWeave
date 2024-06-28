import { MemberRole } from '../community/types';

export type CommentCreationPayload = {
	post_id: string;
	member_id: string;
	body: string;
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

export type CommentsRes = {
	comment_id: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
	parent_comment_id: string;
	member: {
		role: MemberRole;
		user: {
			fullname: string;
		};
	};
}[];
