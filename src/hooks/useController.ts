import { useContext } from 'react';
import { ControllerContext } from '../contexts/controller/Provider';

export default function useController() {
	const context = useContext(ControllerContext);
	if (!context)
		throw new Error('useController must be used within a ControllerProvider');

	const notification = (payload: boolean) => {
		context.dispatch({ type: 'NOTIFICATION', payload });
	};

	const closePostModal = () => {
		context.dispatch({ type: 'POST_MODAL_UPDATE', payload: false });
	};
	const openPostModal = () => {
		context.dispatch({ type: 'POST_MODAL_UPDATE', payload: true });
	};

	return { ...context, closePostModal, openPostModal, notification };
}
