import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import userReducer from './reducer';
import { initControllerState } from './state';
import { ControllerActionType, ControllerStateTypes } from './types';

export const ControllerContext = createContext({
	state: {} as ControllerStateTypes,
	dispatch: {} as Dispatch<ControllerActionType>,
});

const ControllerProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initControllerState);

	return (
		<ControllerContext.Provider value={{ state, dispatch }}>
			{children}
		</ControllerContext.Provider>
	);
};

export default ControllerProvider;
