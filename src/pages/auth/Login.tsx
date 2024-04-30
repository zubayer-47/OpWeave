/* eslint-disable no-mixed-spaces-and-tabs */

import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import Input, { PasswordInput } from '../../components/Inputs/Input';
import { useLoginMutation } from '../../features/auth/authApi';
import { FormHandler } from '../../types/custom';

const Login = () => {
	const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();

	console.log({ error });

	const navigate = useNavigate();

	const onSubmit: FormHandler = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const credentials = {
			username: formData.get('username'),
			password: formData.get('password'),
		};

		toast.promise(
			login({
				...credentials,
			}).unwrap(),
			{
				loading: 'Submitting...',
				success: 'Successfully loggedin!',
				error: 'Could not login',
			}
		);
	};

	if (isSuccess) return <Navigate to='/' />;

	let errorContent = '';

	if (error) {
		if ('status' in error) {
			// you can access all properties of `FetchBaseQueryError` here
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const errMsg = 'error' in error ? error.error : (error.data as any);

			errorContent = errMsg.message;
		} else {
			errorContent = error?.message ? error.message : '';
		}
	}

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
				<p className='text-center text-sm text-red tracking-wide'>
					{errorContent}
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
