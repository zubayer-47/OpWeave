import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
	profile_picture: string | null;
};

const initialState: InitialState = {
	profile_picture: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addProfilePicture: (state: InitialState, action: PayloadAction<string>) => {
			state.profile_picture = action.payload;
		},
	},
});

export const { addProfilePicture } = userSlice.actions;
export default userSlice.reducer;
