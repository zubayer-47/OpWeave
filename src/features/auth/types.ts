export enum UserRight {
	FREE = 100,
	USER = 101,
	MODER = 201,
	ADMIN = 302,
}

enum Gender {
	Male = 'Male',
	Female = 'Female',
	Others = 'Others',
}

export interface User {
	id: number;
	fullname: string;
	username: string;
	rights: UserRight;
	token: string;
	gender: Gender;
	avatar?: string;
	createdAt?: string;
}

export type UserPartial = {
	fullname?: string;
	rights?: UserRight;
	avatar?: string;
	token?: string;
	createdAt?: string;
};

export interface UserStateType {
	isLoggedIn: boolean;
	user: User | UserPartial | null;
}
