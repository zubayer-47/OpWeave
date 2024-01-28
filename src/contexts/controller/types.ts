export interface ControllerStateTypes {
	notification: boolean | null;
	isPostModalOpen: boolean;
}

// #-------------REDUCER TYPES--------------
type NOTIFICATION = {
	type: 'NOTIFICATION';
	payload: boolean;
};
type POST_MODAL_UPDATE = {
	type: 'POST_MODAL_UPDATE';
	payload: boolean;
};

export type ControllerActionType = NOTIFICATION | POST_MODAL_UPDATE;
