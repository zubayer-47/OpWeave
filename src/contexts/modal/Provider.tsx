import { Dispatch, createContext, useReducer } from 'react';
import modalReducer from './reducer';
import { initModalState } from './state';
import { ModalActionType, ModalStateType } from './types';

export const ModalContext = createContext({
	state: {} as ModalStateType,
	dispatch: {} as Dispatch<ModalActionType>,
});

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(modalReducer, initModalState);

	return (
		<ModalContext.Provider value={{ state, dispatch }}>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
