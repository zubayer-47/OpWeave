import { createSlice } from '@reduxjs/toolkit';
import { ModalStateType } from './types';

const initialState: ModalStateType = {
	isVisibleModal: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		updateModal: (state: ModalStateType) => {
			state.isVisibleModal = !state.isVisibleModal;
		},
	},
});

export const { updateModal } = modalSlice.actions;
export default modalSlice.reducer;
