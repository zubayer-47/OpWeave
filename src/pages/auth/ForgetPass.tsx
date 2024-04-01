import { isAxiosError } from 'axios';
import { FC, useState } from 'react';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import Button from '../../components/Buttons/Button';
import Input from '../../components/Inputs/Input';
import { BooleanSetStateType, FormHandler } from '../../types/custom';

type ForgetStateType = {
	email: string | null;
	error: string | null;
	isSuccess: boolean;
	loading: boolean;
};

interface Props {
	setIsForgetPass: BooleanSetStateType;
	setIsLogin: BooleanSetStateType;
}

const ForgetPass: FC<Props> = ({ setIsForgetPass, setIsLogin }) => {
	const [forgetState, setForgetState] = useState<ForgetStateType>({
		email: '',
		loading: false,
		error: '',
		isSuccess: false,
	});

	const onSubmit: FormHandler = async (e) => {
		e.preventDefault();

		setForgetState((prev) => ({
			...prev,
			loading: true,
		}));

		try {
			setTimeout(() => {
				setForgetState((prev) => ({
					...prev,
					loading: false,
					email: forgetState.email,
					isSuccess: true,
				}));
			}, 2000);
		} catch (error) {
			console.error(error);
			if (isAxiosError(error)) {
				const message = error.response?.data;

				setForgetState((prev) => ({
					...prev,
					loading: false,
					error: message,
				}));
			}

			setForgetState((prev) => ({
				...prev,
				loading: false,
				error: 'Something Went Wrong!',
			}));
		}
	};

	return (
		<div className='auth animate-auth-switch'>
			<button
				onClick={() => {
					setIsLogin(false);
					setIsForgetPass(false);
				}}
				type='button'
				className='-ml-2 flex items-center text-nav-selected hover:text-nav-selected/80'
			>
				<FiChevronLeft className='w-7 h-7 text-inherit' />
				<span className='title text-inherit font-Inter'>Login</span>
			</button>
			<div className='mt-8 mb-5 space-y-2'>
				<h1 className='title text-xl font-Inter'>Forgot Password?</h1>
				<p className='sub-title'>Enter email address to recover account</p>
			</div>

			{!forgetState.error ? (
				forgetState.isSuccess && (
					<p className='mt-5 text-center text-sm bg-green-400/80 text-gray-600 p-2 rounded-md tracking-wide flex items-center gap-2'>
						<FiCheck className='w-5 h-5' />
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
					handler={(e) => {
						setForgetState((prev) => ({
							...prev,
							isSuccess: false,
							email: e.target.value,
						}));
					}}
					value={forgetState.email}
					hint='Email'
					showLabel
					isLoading={forgetState.loading}
					error={forgetState.error}
					isRequired
				/>

				<br />
				<Button
					text='Send Mail'
					isLoading={forgetState.loading}
					type='submit'
				/>
			</form>
		</div>
	);
};
export default ForgetPass;
