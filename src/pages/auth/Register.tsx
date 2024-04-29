import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import Input, { PasswordInput } from '../../components/Inputs/Input';
import { useRegisterMutation } from '../../features/auth/authApi';
import { Gender } from '../../features/auth/types';
import { FormHandler } from '../../types/custom';

type FormStateType = {
	credentials: {
		fullname: string | null;
		username: string | null;
		password: string | null;
		email: string | null;
		confirmPassword: string | null;
		gender: string | null;
	};
	errors: RegisterErrors;
};

type RegisterErrors = {
	fullname?: string;
	username?: string;
	password?: string;
	email?: string;
	gender?: Gender;
	[index: string]: string | undefined;
	// commonError: string | null;
};

const RegisterPage = () => {
	const [register, { isLoading, isError, error }] = useRegisterMutation();
	const navigate = useNavigate();

	const [form, setForm] = useState<FormStateType>({
		credentials: {
			fullname: null,
			username: null,
			password: null,
			confirmPassword: null,
			email: null,
			gender: null,
		},
		errors: {},
	});

	const onSubmit: FormHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const credentials = {
			fullname: formData.get('fullname'),
			username: formData.get('username'),
			email: formData.get('email'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword'),
			gender: formData.get('gender'),
		};

		// TODO: 26/4 update this and get rid off form state

		// if (credentials.confirmPassword !== credentials.password) {
		// 	setForm((prev) => ({
		// 		...prev,
		// 		errors: {
		// 			...prev.errors,
		// 			password: 'Password Not Matched',
		// 		},
		// 	}));

		// 	return;
		// }

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...data } = credentials;

		setForm((prev) => ({
			...prev,
			errors: {},
		}));

		toast.promise(register({ ...data }).unwrap(), {
			loading: 'Submitting...',
			success: 'Successfully registered!',
			error: 'Could not register',
		});
	};

	// TODO: 29/4 move it into a new hook called useError and it should be reusable
	const errorContent = useMemo(() => {
		if (error) {
			if ('status' in error) {
				// you can access all properties of `FetchBaseQueryError` here
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const err = 'error' in error ? error.error : (error.data as any);

				if (typeof err === 'object') {
					const possibleErrorProps = [
						'fullname',
						'username',
						'password',
						'email',
						'gender',
					];

					// Get the actual properties present in the error object
					const presentErrorProps = Object.keys(err).filter((prop) =>
						possibleErrorProps.includes(prop)
					);

					const obj: Partial<RegisterErrors> & {
						[index: string]: string | undefined;
					} = {};

					// Check if any of the possible error properties are present
					if (presentErrorProps.length > 0) {
						for (const prop of presentErrorProps) {
							obj[prop] = err[prop];
						}
					}

					setForm((prev) => ({
						...prev,
						errors: obj,
					}));
				}

				return err?.message;
				// errorContent = err?.message;
			} else {
				return error?.message ? error.message : '';
			}
		}
	}, [error]);

	console.log(form.errors, 'errors');

	return (
		<div className='auth animate-auth-switch'>
			<div className='text-center space-y-1'>
				<h1 className='title text-xl font-Inter'>Sign Up</h1>
				<p className='sub-title'>Hey, Enter Your Details to Create Account</p>
			</div>

			{!isError ? null : (
				<p className='ml-2 text-center text-sm text-red-400 tracking-wide'>
					{errorContent}
				</p>
			)}
			<form onSubmit={onSubmit} className='mt-5 grid gap-3'>
				<Input
					name='fullname'
					// handler={(e) =>
					// 	setForm((prev) => ({
					// 		...prev,
					// 		credentials: {
					// 			...prev.credentials,
					// 			fullname: e.target.value,
					// 		},
					// 	}))
					// }
					// value={fullname}
					hint='Full Name'
					showLabel
					isLoading={isLoading}
					error={form.errors.fullname}
					isRequired
				/>
				<Input
					name='username'
					// handler={(e) =>
					// 	setForm((prev) => ({
					// 		...prev,
					// 		credentials: {
					// 			...prev.credentials,
					// 			username: e.target.value,
					// 		},
					// 	}))
					// }
					// value={username}
					hint='Username'
					showLabel
					isLoading={isLoading}
					error={form.errors.username}
					isRequired
				/>
				<Input
					type='email'
					name='email'
					// handler={(e) =>
					// 	setForm((prev) => ({
					// 		...prev,
					// 		credentials: {
					// 			...prev.credentials,
					// 			email: e.target.value,
					// 		},
					// 	}))
					// }
					// value={email}
					hint='Email'
					showLabel
					isLoading={isLoading}
					error={form.errors.email}
					isRequired
				/>
				<div className='bg-transparent'>
					<label
						htmlFor='gender'
						className="title text-sm font-Inter text-light-muted dark:text-dark-muted after:content-['*'] after:text-red"
					>
						Gender
					</label>

					<select
						name='gender'
						className='block w-full px-4 py-2 pr-8 leading-tight text-sm text-dark-text rounded-lg border dark:border-dark-border dark:bg-dark-primary dark:placeholder-dark-muted dark:text-light-primary dark:focus:border-blue-500 dark:focus:outline-none transition-all appearance-none'
						// value={form.credentials.gender}
						// onChange={() => }
						required
					>
						<option className='dark:text-dark-muted'>Choose your gender</option>
						<option className='dark:text-dark-muted' value='male'>
							Male
						</option>
						<option className='dark:text-dark-muted' value='female'>
							Female
						</option>
						<option className='dark:text-dark-muted' value='others'>
							Others
						</option>
					</select>
				</div>

				<PasswordInput
					name='password'
					// handler={(e) =>
					// 	setForm((prev) => ({
					// 		...prev,
					// 		credentials: {
					// 			...prev.credentials,
					// 			password: e.target.value,
					// 		},
					// 	}))
					// }
					// value={password}
					hint='Password'
					showLabel
					isLoading={isLoading}
					error={form.errors.password}
					isRequired
				/>
				<PasswordInput
					name='confirmPassword'
					// handler={(e) =>
					// 	setForm((prev) => ({
					// 		...prev,
					// 		credentials: {
					// 			...prev.credentials,
					// 			confirmPassword: e.target.value,
					// 		},
					// 	}))
					// }
					// value={confirmPassword}
					hint='Confirm Password'
					showLabel
					isLoading={isLoading}
					error={form.errors.password}
					isRequired
				/>

				<Button text='Register' isLoading={isLoading} type='submit' />
			</form>

			<p className='text-center mt-5'>
				<span className='title font-DM-Sans text-sm'>
					Already Have an Account?
				</span>{' '}
				<button
					type='button'
					onClick={() => {
						// setIsLogin(false);
						navigate('/signin');
					}}
					className='link'
				>
					Login Now
				</button>
			</p>
		</div>
	);
};
export default RegisterPage;
