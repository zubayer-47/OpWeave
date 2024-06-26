import { createSlice } from '@reduxjs/toolkit';
import { CommunityStateType } from './types';

const initialState: CommunityStateType = {
	// member_role: MemberRole.MEMBER,
	isJoined: false,
};

export const communitySlice = createSlice({
	name: 'community',
	initialState,
	reducers: {
		// updateMemberRole: (state, action: PayloadAction<MemberRole>) => {
		// 	state.member_role = action.payload;
		// },

		join: (state) => {
			state.isJoined = true;
		},

		leave: (state) => {
			state.isJoined = false;
		},
	},
});

export const { join, leave } = communitySlice.actions;

export default communitySlice.reducer;
