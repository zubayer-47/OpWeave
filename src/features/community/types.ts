import { RuleType } from '../authority/types';

export type Community = {
	community_id: string;
	name: string;
	bio: string;
	description: string;
	avatar: string;
	// member: {
	member_id: string;
	role: MemberRole;
	// };
	createdAt: string;
};

export type GuestCommunityViewType = {
	message: string;
	community_id: string;
	name: string;
	description: string;
	bio: string;
	avatar: string;
	createdAt: string;
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
	// member_role: MemberRole;
	isJoined: boolean;
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

export type CommunityLogoResType = {
	message: string;
	community: {
		community_id: string;
		name: string;
		bio: string;
		description: string;
		avatar: string;
		createdAt: string;
		members: [
			{
				member_id: string;
				role: MemberRole;
			}
		];
		member_id: string;
		role: MemberRole;
	};
};

export type MemberType = {
	community_id: string;
	member_id: string;
	user_id: string;
	user: {
		fullname: string;
		username: string;
		avatar: string;
	};
	restricts: MemberRestrictions;
	banUntil: Date;
	role: string;
};

export type MembersResType = {
	members: MemberType[];
	totalCount: number;
	hasMore: boolean;
};

export type FilterBy = 'authority' | 'all';

export enum MemberRole {
	ADMIN = 'ADMIN',
	MODERATOR = 'MODERATOR',
	MEMBER = 'MEMBER',
}

export enum MemberRestrictions {
	BAN = 'BAN',
	MUTE = 'MUTE',
	PUBLIC = 'PUBLIC',
}
