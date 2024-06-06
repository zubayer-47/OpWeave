import { RuleType } from '../authority/types';

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

export type CommunitiesResType = {
	communities: {
		community_id: string,
		bio: string,
		name: string,
		avatar: string,
		createdAt: string
	}[]
}

export type CommunityStateType = {
	member_role: MemberRole;
};

export type CommunityRulesType = { rules: RuleType[] };

export type MemberJoiningResType = {
    message: string;
    member: {
        community_id: string;
        member_id: string;
        role: string;
    }
}

export enum MemberRole {
	ADMIN = 'ADMIN',
	MODERATOR = 'MODERATOR',
	MEMBER = 'MEMBER',
}
