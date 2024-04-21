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
	active?: boolean;
	unable?: boolean;
}

export type UserPartial = {
	fullname?: string;
	rights?: UserRight;
	active?: boolean;
	unable?: boolean;
};

type AuthErrorType = {
	message?: string;

	fullname?: string;
	username?: string;
	email?: string;
	password?: string;
};

export interface UserStateType {
	authError: AuthErrorType | null;
	authLoading: boolean;
	isLoggedIn: boolean;
	user: User | UserPartial | null;
}

// #-------------REDUCER TYPES--------------
type AUTH_LOADING = {
	type: 'AUTH_LOADING';
	payload?: boolean;
};
type AUTH_ERROR = {
	type: 'AUTH_ERROR';
	payload: AuthErrorType | null;
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

export type UserActionType =
	| AUTH_LOADING
	| AUTH_ERROR
	| SET_AUTH
	| REM_AUTH
	| UPDATE_USER;
