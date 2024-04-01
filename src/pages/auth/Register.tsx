import { FC, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Input, { PasswordInput } from '../../components/Inputs/Input';
import useAuth from '../../hooks/useAuth';
import { BooleanSetStateType, FormHandler } from '../../types/custom';

type FormStateType = {
	credentials: {
		fullname: string | null;
		username: string | null;
		password: string | null;
		email: string | null;
		confirmPassword: string | null;
		error: string | null;
	};
	errors: RegisterErrors;
};

type RegisterErrors = {
	fullname: string | null;
	username: string | null;
	password: string | null;
	email: string | null;
	commonError: string | null;
};

type Props = {
	setIsLogin: BooleanSetStateType;
};

const RegisterPage: FC<Props> = ({ setIsLogin }) => {
	const { state, register } = useAuth();
	const [form, setForm] = useState<FormStateType>({
		credentials: {
			fullname: null,
			username: null,
			password: null,
			confirmPassword: null,
			email: null,
			error: null,
		},
		errors: {
			fullname: null,
			username: null,
			password: null,
			email: null,
			commonError: null,
		},
	});

	const onSubmit: FormHandler = async (e) => {
		e.preventDefault();
		const { email, fullname, password, username, confirmPassword } =
			form.credentials;

		if (confirmPassword !== password) {
			setForm((prev) => ({
				...prev,
				errors: {
					...prev.errors,
					password: 'Password Not Matched',
				},
			}));

			return;
		}

		if (email && fullname && password && username) {
			register({ email, fullname, password, username });
		}
	};
	const { email, fullname, password, username, confirmPassword } =
		form.credentials;

	return (
		<div className='auth animate-auth-switch'>
			<div className='text-center space-y-1'>
				<h1 className='title text-xl font-Inter'>Sign Up</h1>
				<p className='sub-title'>Hey, Enter Your Details to Create Account</p>
			</div>

			{!state.authError ? null : (
				<p className='ml-2 text-center text-sm text-red-400 tracking-wide'>
					{state.authError?.message}
				</p>
			)}
			<form onSubmit={onSubmit} className='mt-5 grid gap-3'>
				<Input
					name='fullname'
					handler={(e) =>
						setForm((prev) => ({
							...prev,
							credentials: {
								...prev.credentials,
								fullname: e.target.value,
							},
						}))
					}
					value={fullname}
					hint='Full Name'
					showLabel
					isLoading={state.authLoading}
					error={form.errors.fullname}
					isRequired
				/>
				<Input
					name='username'
					handler={(e) =>
						setForm((prev) => ({
							...prev,
							credentials: {
								...prev.credentials,
								username: e.target.value,
							},
						}))
					}
					value={username}
					hint='Username'
					showLabel
					isLoading={state.authLoading}
					error={form.errors.username}
					isRequired
				/>
				<Input
					type='email'
					name='email'
					handler={(e) =>
						setForm((prev) => ({
							...prev,
							credentials: {
								...prev.credentials,
								email: e.target.value,
							},
						}))
					}
					value={email}
					hint='Email'
					showLabel
					isLoading={state.authLoading}
					error={form.errors.email}
					isRequired
				/>

				<PasswordInput
					name='password'
					handler={(e) =>
						setForm((prev) => ({
							...prev,
							credentials: {
								...prev.credentials,
								password: e.target.value,
							},
						}))
					}
					value={password}
					hint='Password'
					showLabel
					isLoading={state.authLoading}
					error={form.errors.password}
					isRequired
					notMatched={!!confirmPassword && password !== confirmPassword}
				/>
				<PasswordInput
					name='confirmPassword'
					handler={(e) =>
						setForm((prev) => ({
							...prev,
							credentials: {
								...prev.credentials,
								confirmPassword: e.target.value,
							},
						}))
					}
					value={confirmPassword}
					hint='Confirm Password'
					showLabel
					isLoading={state.authLoading}
					error={form.errors.password}
					isRequired
					notMatched={!!confirmPassword && password !== confirmPassword}
				/>

				<Button text='Register' isLoading={state.authLoading} type='submit' />
			</form>

			<p className='text-center mt-5'>
				<span className='title font-DM-Sans text-sm'>
					Already Have an Account?
				</span>{' '}
				<button
					type='button'
					onClick={() => setIsLogin(false)}
					className='link'
				>
					Login Now
				</button>
			</p>
		</div>
	);
};
export default RegisterPage;
