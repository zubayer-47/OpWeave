export enum UserRight {
	// FREE = 100,
	USER = 101,
	MODER = 201,
	ADMIN = 302,
}

export enum Gender {
	Male = 'Male',
	Female = 'Female',
	Others = 'Others',
}

export interface User {
	id: number;
	fullname: string;
	username: string;
	rights: UserRight;
	gender: Gender;
	avatar: string;
	createdAt: string;
}

export type UserPartial = {
	fullname?: string;
	username?: string;
	rights?: UserRight;
	gender?: Gender;
	avatar?: string;
	createdAt?: string;
};

export interface UserStateType {
	access_token: string | null;
	user: User | null;
}
