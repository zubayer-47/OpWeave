import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserPartial, UserRight, UserStateType } from './types';

const initialState: UserStateType = {
	// isLoggedIn: false,
	// user: null,
	isLoggedIn: true,
	user: {
		id: 1,
		fullname: 'Zubayer',
		username: 'zubayerjs',
		// TODO: in this application member should have right but user should not have a right
		rights: UserRight.ADMIN,
		active: true,
	},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		update: (state, action: PayloadAction<UserPartial>) => {
			state.user = action.payload;
		},
		remove: (state) => {
			state.user = null;
		},
	},
});

export const { add, remove, update } = authSlice.actions;

export default authSlice.reducer;