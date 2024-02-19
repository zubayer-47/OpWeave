import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ForgetPass from './ForgetPass';
import Login from './Login';
import Register from './Register';

const Auth = () => {
	const {
		state: { isLoggedIn },
	} = useAuth();
	// TODO: change this. look at first where from getting updated this state
	const [isLogin, setIsLogin] = useState(false);
	const [isForgetPass, setIsForgetPass] = useState(false);

	const navigate = useNavigate();

	console.log('isLoggedIn :', isLoggedIn);

	useEffect(() => {
		isLoggedIn && navigate('/', { replace: true });
	}, [navigate, isLoggedIn]);

	console.log('sss');

	return (
		<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
			<div className='w-102'>
				{!isLogin ? (
					<Register setIsLogin={setIsLogin} />
				) : !isForgetPass ? (
					<Login setIsLogin={setIsLogin} setIsForgetPass={setIsForgetPass} />
				) : (
					<ForgetPass setIsForgetPass={setIsForgetPass} />
				)}
			</div>
		</div>
	);
};

export default Auth;
