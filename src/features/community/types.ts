import { RuleType } from '../authority/types';

export interface Community {
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
}

export type UnAuthorizedCommunityType = {
	message: string;
	community: {
		name: string;
		bio: string;
		avatar: string;
	};
};

// {
//     "message": "you do not have permission to access this route",
//     "community": {
//         "name": "Unnoyon",
//         "bio": "this is Unnoyon community",
//         "avatar": "http://www.gravatar.com/avatar?d=identicon"
//     }
// }

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

export enum MemberRole {
	ADMIN = 'ADMIN',
	MODERATOR = 'MODERATOR',
	MEMBER = 'MEMBER',
}
