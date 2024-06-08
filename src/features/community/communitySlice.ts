import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommunityStateType, MemberRole } from './types';

const initialState: CommunityStateType = {
	member_role: MemberRole.MEMBER,
	isJoined: false,
};

export const communitySlice = createSlice({
	name: 'community',
	initialState,
	reducers: {
		updateMemberRole: (state, action: PayloadAction<MemberRole>) => {
			state.member_role = action.payload;
		},

		join: (state) => {
			state.isJoined = true;
		},

		leave: (state) => {
			state.isJoined = false;
		},
	},
});

export const { updateMemberRole, join, leave } = communitySlice.actions;

export default communitySlice.reducer;
