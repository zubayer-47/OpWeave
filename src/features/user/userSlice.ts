import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
	profile_picture: string | null;
};

const initialState: InitialState = {
	profile_picture: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
