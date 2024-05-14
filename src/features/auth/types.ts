export enum Gender {
	Male = 'Male',
	Female = 'Female',
}

export interface User {
	id: string;
	fullname: string;
	username: string;
	email: string;
	// rights: UserRight;
	gender: Gender;
	avatar: string;
	bio: string;
	// createdAt: string;
}

export type UserPartial = {
	fullname?: string;
	username?: string;
	email?: string;
	// rights?: UserRight;
	gender?: Gender;
	avatar?: string;
	bio?: string;
	// createdAt?: string;
};

export interface UserStateType {
	access_token: string | null;
	user: User | null;
}
