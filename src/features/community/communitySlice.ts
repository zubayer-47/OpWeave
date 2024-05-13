import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommunityStateType, MemberRole } from './types';

const initialState: CommunityStateType = {
	member_role: MemberRole.MEMBER,
};

export const communitySlice = createSlice({
	name: 'community',
	initialState,
	reducers: {
		updateMemberRole: (state, action: PayloadAction<MemberRole>) => {
			state.member_role = action.payload;
		},
	},
});

export const { updateMemberRole } = communitySlice.actions;

export default communitySlice.reducer;
