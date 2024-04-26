import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { updateAuthModal } from '../../../features/modal/modalSlice';
import ModalBox from '../../../layouts/ModalLayouts/ModalBox';
import ForgetPass from '../ForgetPass';
import Login from '../Login';

const AuthModal = () => {
	const [isForgetPass, setIsForgetPass] = useState(false);
	const location = useLocation();

	// would it be a good approach or not?
	if (location.pathname === '/auth') updateAuthModal(false);

	return (
		<ModalBox
			onClose={() => updateAuthModal(false)}
			classes='h-fit max-w-96 m-auto'
			overlyBg='bg-black/20'
		>
			{!isForgetPass ? (
				<Login setIsForgetPass={setIsForgetPass} />
			) : (
				<ForgetPass setIsForgetPass={setIsForgetPass} />
			)}
		</ModalBox>
	);
};
export default AuthModal;
