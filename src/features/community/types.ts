export interface CommunityPayload {
	name: string;
	bio: string;
	rules: string;
}

export interface Community extends CommunityPayload {
	community_id: string;
	createdAt: string;
	avatar?: string;
}
