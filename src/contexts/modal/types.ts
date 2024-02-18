export interface ModalStateType {
	isVisibleAuthModal: boolean;
}

// #-------------REDUCER TYPES--------------
type UPDATE_AUTH_MODAL = {
	type: 'UPDATE_AUTH_MODAL';
	payload: boolean;
};

export type ModalActionType = UPDATE_AUTH_MODAL;
