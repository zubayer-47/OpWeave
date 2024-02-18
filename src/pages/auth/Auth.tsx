import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ForgetPass from './ForgetPass';
import Login from './Login';
import Register from './Register';

const Auth = () => {
	const {
		state: { isLoggedIn },
	} = useAuth();
	const [isLogin, setIsLogin] = useState(false);
	const [isForgetPass, setIsForgetPass] = useState(false);

	console.log('isLoggedIn :', isLoggedIn);
	return (
		<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
			{isLoggedIn && <Navigate to='/' />}

			{!isLogin ? (
				<Register setIsLogin={setIsLogin} />
			) : !isForgetPass ? (
				<Login setIsLogin={setIsLogin} setIsForgetPass={setIsForgetPass} />
			) : (
				<ForgetPass setIsForgetPass={setIsForgetPass} />
			)}
		</div>
	);
};

export default Auth;
