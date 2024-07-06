import { ChevronLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import { PasswordInput } from '../../components/Inputs/Input';
import { useResetPasswordMutation } from '../../features/auth/authApi';
import useQueryParams from '../../hooks/useQueryParams';
import { FormHandler } from '../../types/custom';

type ResetStateType = {
	email: string | null;
	error: string | null;
	isSuccess: boolean;
	loading: boolean;
};

const ResetPass = () => {
	const [resetState, setResetState] = useState<ResetStateType>({
		email: '',
		loading: false,
		error: '',
		isSuccess: false,
	});
	const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
	const navigate = useNavigate();
	const query = useQueryParams();

	useMemo(() => {
		if (error) {
			if ('status' in error) {
				// you can access all properties of `FetchBaseQueryError` here
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const err = 'error' in error ? error.error : (error.data as any);

				if (typeof err === 'object') {
					setResetState((prev) => ({ ...prev, error: err?.password }));
				}

				return err?.message;
				// errorContent = err?.message;
			} else {
				return error?.message ? error.message : '';
			}
		}
	}, [error]);

	const onSubmit: FormHandler = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const inputData = {
			password: formData.get('password'),
			cpassword: formData.get('cpassword'),
		};

		const notMatch = inputData.password !== inputData.cpassword;

		if (notMatch) {
			setResetState((prev) => ({ ...prev, error: 'Not Matched' }));

			return;
		}

		setResetState((prev) => ({ ...prev, error: '' }));

		const token = query.get('token') ?? '';

		try {
			await toast.promise(
				resetPassword({ password: inputData.password, token }).unwrap(),
				{
					loading: 'loading...',
					success: 'reset successfully',
					error: "couldn't reset",
				}
			);

			navigate('/auth/signin');
			e.currentTarget.reset();
		} catch (error) {
			//
		}
	};

	return (
		<div className='auth animate-auth-switch'>
			<button
				onClick={() => {
					// setIsForgetPass(false);
					navigate('/auth/signin');
				}}
				type='button'
				className='-ml-2 flex items-center text-nav-selected hover:text-nav-selected/80'
			>
				<ChevronLeft className='w-7 h-7 text-inherit' />
				<span className='title text-inherit font-Inter'>Login</span>
			</button>
			<div className='mt-8 mb-5 space-y-2'>
				<h1 className='title text-xl font-Inter'>Reset Password</h1>
			</div>

			<form onSubmit={onSubmit}>
				<PasswordInput
					name='password'
					hint='Password'
					showLabel
					isLoading={isLoading}
					error={resetState.error}
					isRequired
				/>

				<PasswordInput
					name='cpassword'
					hint='Confirm Password'
					showLabel
					isLoading={isLoading}
					error={resetState.error}
					isRequired
				/>

				<br />
				<Button text='Reset' isLoading={isLoading} type='submit' />
			</form>
		</div>
	);
};

export default ResetPass;
