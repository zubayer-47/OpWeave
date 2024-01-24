export enum UserRight {
	USER = 101,
	MODER = 201,
	ADMIN = 302,
}

interface User {
	id: number;
	fullname: string;
	username: string;
	rights: UserRight;
	active?: boolean;
	unable?: boolean;
}

type UserPartial = {
	fullname?: string;
	rights?: UserRight;
	active?: boolean;
	unable?: boolean;
};

export interface UserStateType {
	authLoading: boolean;
	isLoggedIn: boolean;
	user: User | UserPartial | null;
}

// #-------------REDUCER TYPES--------------
type AUTH_LOADING = {
	type: 'AUTH_LOADING';
	payload?: boolean;
};
type SET_AUTH = {
	type: 'SET_AUTH';
	payload: User;
};
type REM_AUTH = {
	type: 'REM_AUTH';
};
type UPDATE_USER = {
	type: 'UPDATE_USER';
	payload: Partial<UserPartial>;
};

export type UserActionType = AUTH_LOADING | SET_AUTH | REM_AUTH | UPDATE_USER;
