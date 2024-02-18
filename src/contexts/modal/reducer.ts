import { ModalActionType, ModalStateType } from './types';

const modalReducer = (
	state: ModalStateType,
	action: ModalActionType
): ModalStateType => {
	switch (action.type) {
		case 'UPDATE_AUTH_MODAL':
			return {
				...state,
				isVisibleAuthModal: action.payload,
			};
		default:
			return state;
	}
};

export default modalReducer;
