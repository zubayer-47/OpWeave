import { RuleType } from '../authority/types';

export type Community = {
	community_id: string;
	name: string;
	bio: string;
	description: string;
	avatar: string;
	member: {
		member_id: string;
		role: MemberRole;
	};
	createdAt: string;
};

export type GuestCommunityViewType = {
	message: string;
	community_id: string;
	name: string;
	bio: string;
	avatar: string;
};

export type CommunityItemResType = {
	community_id: string;
	name: string;
	bio: string;
	avatar: string;
};

export type CommunitiesResType = {
	communities: CommunityItemResType[];
};

export type LeaveCommunityResType = {
	message: string;
	member: {
		community_id: string;
		member_id: string;
	};
};

export type CommunityStateType = {
	member_role: MemberRole;
};

export type CommunityRulesType = { rules: RuleType[] };

export type CommunityCreationAndJoiningResType = {
	community_id: string;
	member_id: string;
	bio: string;
	name: string;
	avatar: string;
	createdAt: string;
	role?: string;
};

export type MemberType = {
	community_id: string;
	member_id: string;
	user_id: string;
	user: {
		avatar: string;
		fullname: string;
	};
	role: string;
};

export type MembersResType = {
	members: MemberType[];
	total: number;
};

export enum MemberRole {
	ADMIN = 'ADMIN',
	MODERATOR = 'MODERATOR',
	MEMBER = 'MEMBER',
}
