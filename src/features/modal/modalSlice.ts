import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalStateType } from './types';

const initialState: ModalStateType = {
	isVisibleAuthModal: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		updateAuthModal: (
			state: ModalStateType,
			action: PayloadAction<boolean>
		) => {
			state.isVisibleAuthModal = action.payload;
		},
	},
});

export const { updateAuthModal } = modalSlice.actions;
export default modalSlice.reducer;
