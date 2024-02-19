import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import Input, { PasswordInput } from '../../components/Inputs/Input';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
import {
	BooleanSetStateType,
	FormHandler,
	InputType,
} from '../../types/custom';

interface Props {
	setIsForgetPass: BooleanSetStateType;
	setIsLogin?: BooleanSetStateType;
}

const LoginPage: FC<Props> = ({ setIsForgetPass, setIsLogin }) => {
	const { state, login } = useAuth();
	const modalContext = useModal();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		username: '',
		password: '',
	});

	const handleInput = (e: InputType) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit: FormHandler = async (e) => {
		e.preventDefault();

		login(form.username, form.password);
	};

	return (
		<div className='auth animate-auth-switch'>
			<div className='text-center space-y-2'>
				<h1 className='title text-xl font-Inter'>Log In</h1>
				<p className='sub-title'>
					Hey, Enter Your Details to Login Your Account
				</p>
			</div>

			{!state.authError ? null : (
				<p className='text-center text-sm text-red-400 tracking-wide'>
					{state.authError?.message}
				</p>
			)}

			<form onSubmit={onSubmit} className='mt-5 grid gap-3'>
				<Input
					name='username'
					handler={handleInput}
					value={form.username}
					hint='Username'
					showLabel
					isLoading={state.authLoading}
					isRequired
				/>

				<PasswordInput
					name='password'
					handler={handleInput}
					value={form.password}
					hint='Password'
					showLabel
					isLoading={state.authLoading}
					isRequired
				/>

				<button
					type='button'
					className='link w-fit mb-3'
					onClick={() => setIsForgetPass(true)}
				>
					Forgot Password?
				</button>

				<Button
					title='Login Account'
					type='submit'
					isLoading={state.authLoading}
				/>
			</form>

			<p className='text-center mt-5'>
				<span className='title font-DM-Sans text-sm'>
					Don't Have an Account?
				</span>{' '}
				<button
					type='button'
					onClick={() => {
						if (typeof setIsLogin !== 'function') {
							modalContext.updateModal(false);
							navigate('/auth');
							return;
						}

						setIsLogin(false);
					}}
					className='link'
				>
					Register Now
				</button>
			</p>
		</div>
	);
};
export default LoginPage;
