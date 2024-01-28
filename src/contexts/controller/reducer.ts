import { ControllerActionType, ControllerStateTypes } from './types';

const controllerReducer = (
	state: ControllerStateTypes,
	action: ControllerActionType
): ControllerStateTypes => {
	switch (action.type) {
		case 'NOTIFICATION':
			return {
				...state,
				notification: action.payload,
			};
		case 'POST_MODAL_UPDATE':
			return {
				...state,
				isPostModalOpen: action.payload,
			};

		default:
			return state;
	}
};

export default controllerReducer;
