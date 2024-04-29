import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserStateType } from './types';

const initialState: UserStateType = {
	isLoggedIn: false,
	user: null,
	// isLoggedIn: true,
	// user: {
	// 	id: 1,
	// 	fullname: 'Zubayer',
	// 	username: 'zubayerjs',
	// 	// TODO: in this application member should have right but user should not have a right
	// 	rights: UserRight.USER,
	// 	active: true,
	// },
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<User>) => {
			state.isLoggedIn = true;
			state.user = action.payload;
		},
		update: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		remove: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		},
		addProfilePicture: (state, action: PayloadAction<string>) => {
			if (state.user) {
				state.user.avatar = action.payload;
			}
		},
	},
});

export const { add, remove, update, addProfilePicture } = authSlice.actions;

export default authSlice.reducer;
