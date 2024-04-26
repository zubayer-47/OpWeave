import { useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import Input, { PasswordInput } from '../../components/Inputs/Input';
import { useLoginMutation } from '../../features/auth/authApi';
import { FormHandler } from '../../types/custom';

// interface Props {
// 	setIsForgetPass: BooleanSetStateType;
// 	setIsLogin?: BooleanSetStateType;
// }

const Login = () => {
	const [login, { isLoading, isError, error }] = useLoginMutation();
	console.log('error :', error);

	const navigate = useNavigate();

	const onSubmit: FormHandler = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const credentials = {
			username: formData.get('username'),
			password: formData.get('password'),
		};

		login({ ...credentials });
	};

	const goToRegister = () => navigate('/auth/signup');

	return (
		<div className='auth animate-auth-switch'>
			<div className='text-center space-y-2'>
				<h1 className='title text-xl font-Inter'>Log In</h1>
				<p className='sub-title'>
					Hey, Enter Your Details to Login Your Account
				</p>
			</div>

			{!isError ? null : (
				<p className='text-center text-sm text-red-400 tracking-wide'>
					{/* // TODO: provide error */}
					dummy err
				</p>
			)}

			<form onSubmit={onSubmit} className='mt-5 grid gap-3'>
				<Input
					name='username'
					// handler={handleInput}
					// value={form.username}
					hint='Username'
					showLabel
					isLoading={isLoading}
					isRequired
				/>

				<PasswordInput
					name='password'
					// handler={handleInput}
					// value={form.password}
					hint='Password'
					showLabel
					isLoading={isLoading}
					isRequired
				/>

				<button
					type='button'
					className='link w-fit mb-3'
					onClick={() => {
						// if (typeof setIsLogin === 'function') {
						// 	setIsLogin(true);
						// }
						// setIsForgetPass(true);

						navigate('/forget-pass');
					}}
				>
					Forgot Password?
				</button>
				{/* 
				<Button
					title='Login Account'
					type='submit'
					isLoading={isLoading}
				/> */}

				<Button text='Login Account' isLoading={isLoading} type='submit' />
			</form>

			<p className='text-center mt-5'>
				<span className='title font-DM-Sans text-sm'>
					Don't Have an Account?
				</span>{' '}
				<button type='button' onClick={goToRegister} className='link'>
					Register Now
				</button>
			</p>
		</div>
	);
};
export default Login;
