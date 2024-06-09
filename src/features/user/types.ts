export type UserUpdatePayload = {
	fullname: string;
	// username: string;
	bio: string;
	email: string;
	gender: string;
	password: string;
};

export type UserProfileType = {
	user_id: string;
	fullname: string;
	username: string;
	bio: string;
	avatar: string;
};
