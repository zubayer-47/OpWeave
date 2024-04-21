import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserPartial, UserRight, UserStateType } from './types';

const initialState: UserStateType = {
	authError: null,
	authLoading: false,
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

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<Partial<User>>) => {
			state.user = action.payload;
		},
		update: (state, action: PayloadAction<Partial<UserPartial>>) => {
			state.user = action.payload;
		},
		remove: (state) => {
			state.user = null;
		},
	},
});

export const { add, remove, update } = userSlice.actions;

export default userSlice.reducer;
