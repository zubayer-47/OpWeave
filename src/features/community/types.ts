export interface CommunityPayload {
	name: string;
	bio: string;
	rules: string;
}

export interface Community extends CommunityPayload {
	community_id: string;
	description: string;
	createdAt: string;
	avatar: string;
	member: {
		member_id: string;
		role: MemberRole;
	};
}

export type CommunityStateType = {
	member_role: MemberRole;
};

export enum MemberRole {
	ADMIN = 'ADMIN',
	MODERATOR = 'MODERATOR',
	MEMBER = 'MEMBER',
}
