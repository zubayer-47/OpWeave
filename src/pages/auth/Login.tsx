/* eslint-disable no-mixed-spaces-and-tabs */

import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import Input, { PasswordInput } from '../../components/Inputs/Input';
import { useLoginMutation } from '../../features/auth/authApi';
import { FormHandler } from '../../types/custom';

const Login = () => {
	const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

	const navigate = useNavigate();

	const onSubmit: FormHandler = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const credentials = {
			username: formData.get('username'),
			password: formData.get('password'),
		};

		login({
			...credentials,
		});
	};

	if (isSuccess) return <Navigate to='/' />;

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
					hint='Username'
					showLabel
					isLoading={isLoading}
					isRequired
				/>

				<PasswordInput
					name='password'
					hint='Password'
					showLabel
					isLoading={isLoading}
					isRequired
				/>

				<button
					type='button'
					className='link w-fit mb-3'
					onClick={() => {
						navigate('/auth/forget-pass');
					}}
				>
					Forgot Password?
				</button>

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
