import { useCallback, useContext } from 'react';
import { ModalContext } from '../contexts/modal/Provider';

export default function useModal() {
	const context = useContext(ModalContext);
	// console.log('context :', context);
	if (!context) throw new Error('useModal must be used within a ModalProvider');

	const { dispatch } = context;

	const updateModal = useCallback(
		(payload: boolean) => {
			dispatch({ type: 'UPDATE_AUTH_MODAL', payload });
		},
		[dispatch]
	);
	return { ...context, updateModal };
}
