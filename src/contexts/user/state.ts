import { UserStateType } from './types';

export const initUserState: UserStateType = {
	authError: null,
	authLoading: false,
	isLoggedIn: false,
	user: null,
};
