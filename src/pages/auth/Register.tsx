import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import Input, { PasswordInput } from '../../components/Inputs/Input';
import { useRegisterMutation } from '../../features/auth/authApi';
import { Gender } from '../../features/auth/types';
import useAuthError from '../../hooks/useAuthError';
import { FormHandler } from '../../types/custom';

const RegisterPage = () => {
	const [register, { isLoading, isError, error }] = useRegisterMutation();
	const [errState, { errorContent, resetErr, checkPassword }] = useAuthError({
		error,
	});
	const navigate = useNavigate();

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

		const notMatch =
			checkPassword &&
			checkPassword(credentials.password, credentials.confirmPassword);

		if (notMatch) return;

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...data } = credentials;

		resetErr();

		toast.promise(register({ ...data }).unwrap(), {
			loading: 'Submitting...',
			success: 'Successfully registered!',
			error: 'Could not register',
		});
	};

	return (
		<div className='auth animate-auth-switch h-fit overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'>
			<div className='text-center space-y-1'>
				<h1 className='title text-xl font-Inter'>Register</h1>
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
					hint='Full Name'
					showLabel
					isLoading={isLoading}
					error={errState.fullname}
					isRequired
				/>
				<Input
					name='username'
					hint='Username'
					showLabel
					isLoading={isLoading}
					error={errState.username}
					isRequired
				/>
				<Input
					type='email'
					name='email'
					hint='Email'
					showLabel
					isLoading={isLoading}
					error={errState.email}
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
						required
					>
						<option className='dark:text-dark-muted'>Choose your gender</option>
						<option className='dark:text-dark-muted' value={Gender.Male}>
							{Gender.Male}
						</option>
						<option className='dark:text-dark-muted' value={Gender.Female}>
							{Gender.Female}
						</option>
					</select>
				</div>

				<PasswordInput
					name='password'
					hint='Password'
					showLabel
					isLoading={isLoading}
					error={errState.password}
					isRequired
				/>
				<PasswordInput
					name='confirmPassword'
					hint='Confirm Password'
					showLabel
					isLoading={isLoading}
					error={errState.password}
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
						navigate('/auth/signin');
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
