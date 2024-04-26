import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ControllerStateTypes } from './types';

const initialState: ControllerStateTypes = {
	isPostModalOpen: false,
};

const controllerSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		updatePostModal: (
			state: ControllerStateTypes,
			action: PayloadAction<boolean>
		) => {
			state.isPostModalOpen = action.payload;
		},
	},
});

export const { updatePostModal } = controllerSlice.actions;
export default controllerSlice.reducer;
