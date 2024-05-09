export type Post = {
	post_id: string;
	community_id: string;
	member_id: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
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
