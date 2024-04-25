export enum UserRight {
	FREE = 100,
	USER = 101,
	MODER = 201,
	ADMIN = 302,
}

export interface User {
	id: number;
	fullname: string;
	username: string;
	rights: UserRight;
	token: string;
	active?: boolean;
	unable?: boolean;
}

export type UserPartial = {
	fullname?: string;
	rights?: UserRight;
	active?: boolean;
	unable?: boolean;
	token?: string;
};

export interface UserStateType {
	isLoggedIn: boolean;
	user: User | UserPartial | null;
}
