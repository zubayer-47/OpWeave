import { UserStateType } from './types';

export const initUserState: UserStateType = {
	authError: null,
	authLoading: false,
	isLoggedIn: false,
	user: null,
	// user: {
	// 	id: 1,
	// 	fullname: 'Zubayer',
	// 	username: 'zubayerjs',
	// 	// TODO: in this application member should have right but user should not have a right
	// 	rights: UserRight.ADMIN,
	// 	active: true,
	// },
};
