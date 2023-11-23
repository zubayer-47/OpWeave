import { initUserState } from './state';
import { UserActionType, UserStateType } from './types';

const userReducer = (
	state: UserStateType,
	action: UserActionType
): UserStateType => {
	switch (action.type) {
		case 'AUTH_LOADING':
			return {
				...state,
				authLoading: !action.payload || !state.authLoading,
			};

		case 'SET_AUTH': {
			const userInfo = action.payload;
			return {
				authLoading: false,
				isLoggedIn: true,
				user: {
					...userInfo,
				},
			};
		}

		case 'UPDATE_USER':
			return {
				...state,
				user: {
					...state.user,
					...action.payload,
				},
			};

		case 'REM_AUTH':
			return initUserState;

		default:
			return state;
	}
};

export default userReducer;
