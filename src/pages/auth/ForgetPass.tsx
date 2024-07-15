import { Check, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import Input from '../../components/Inputs/Input';
import { useForgetPasswordMutation } from '../../features/auth/authApi';
import { FormHandler } from '../../types/custom';

type ForgetStateType = {
	email: string | null;
	error: string | null;
	isSuccess: boolean;
	loading: boolean;
};

const ForgetPass = () => {
	const [forgetState] = useState<ForgetStateType>({
		email: '',
		loading: false,
		error: '',
		isSuccess: false,
	});
	const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
	const navigate = useNavigate();

	const onSubmit: FormHandler = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const inputData = {
			email: formData.get('email'),
		};

		try {
			const res = await toast.promise(
				forgetPassword(inputData.email).unwrap(),
				{
					loading: 'loading...',
					success: 'sent',
					error: "couldn't send",
				}
			);

			navigate(`/auth/reset-pass?token=${res.token}`);
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
				<h1 className='title text-xl font-Inter'>Forgot Password?</h1>
				<p className='sub-title'>Enter email address to recover account</p>
			</div>

			{!forgetState.error ? (
				forgetState.isSuccess && (
					<p className='mt-5 text-center text-sm bg-green-400/80 text-gray-600 p-2 rounded-md tracking-wide flex items-center gap-2'>
						<Check className='w-5 h-5' />
						sent email successfully to {forgetState.email}
					</p>
				)
			) : (
				<p className='mt-5 ml-2 text-center text-sm text-red-400 tracking-wide'>
					{forgetState.error}
				</p>
			)}

			<form onSubmit={onSubmit}>
				<Input
					name='email'
					type='email'
					// handler={(e) => {
					// 	setForgetState((prev) => ({
					// 		...prev,
					// 		isSuccess: false,
					// 		email: e.target.value,
					// 	}));
					// }}
					// value={forgetState.email}
					hint='Email'
					showLabel
					isLoading={forgetState.loading}
					error={forgetState.error}
					isRequired
				/>

				<br />
				<Button text='Send Mail' isLoading={isLoading} type='submit' />
			</form>
		</div>
	);
};
export default ForgetPass;
