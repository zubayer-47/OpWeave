import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { InputType } from '../../types/custom';

type InputProp = {
	name: string;
	handler: (e: InputType) => void;
	type?: string;
	hint?: string;
	value?: string | null;
	isLoading?: boolean;
	isRequired?: boolean;
	showLabel?: boolean;
	error?: string | null;
	notMatched?: boolean;
};

const Input = ({
	name,
	handler,
	type = 'text',
	hint = '',
	value,
	isLoading = false,
	isRequired = false,
	showLabel = false,
	error = '',
}: InputProp) => {
	return (
		<div className='bg-transparent flex-1'>
			{showLabel && (
				<label
					htmlFor={name}
					className={`capitalize font-semibold text-sm  text-slate-600 ${
						!isRequired ? '' : "after:content-['*'] after:text-red-500"
					}`}
				>
					{hint}
				</label>
			)}
			<input
				type={type}
				name={name}
				className='w-full p-3 rounded-lg bg-transparent outline-none tracking-wider border border-indigo-200'
				placeholder={hint}
				value={value || ''}
				onChange={handler}
				autoComplete='off'
				disabled={isLoading}
				required={isRequired}
			/>
			{!error ? null : (
				<p className='ml-2 text-sm text-red-400 tracking-wide'>{error}</p>
			)}
		</div>
	);
};

export default Input;

export const PasswordInput = ({
	name,
	handler,
	hint = '',
	value,
	isLoading = false,
	showLabel = false,
	isRequired,
	error = '',
	notMatched,
}: InputProp) => {
	const [show, setShow] = useState(false);

	const onVisible = () => setShow((prev) => !prev);

	return (
		<div className='bg-transparent'>
			{showLabel && (
				<label
					htmlFor={name}
					className={`capitalize font-semibold text-sm  text-slate-600 ${
						!isRequired ? '' : "after:content-['*'] after:text-red-500"
					}`}
				>
					{hint}
				</label>
			)}
			<div
				className={`flex items-stretch border rounded-lg ${
					!notMatched ? 'border-indigo-200' : 'border-red-500'
				}`}
			>
				<input
					type={show ? 'text' : 'password'}
					name={name}
					className={`flex-1 p-3 bg-transparent outline-none tracking-wider`}
					placeholder={hint}
					value={value || ''}
					onChange={handler}
					disabled={isLoading}
					required={isRequired}
				/>
				{!value ? null : (
					<button type='button' className='p-2' onClick={onVisible}>
						{show ? (
							<FiEyeOff className='w-5 h-5 stroke-1 text-indigo-300' />
						) : (
							<FiEye className='w-5 h-5 stroke-1 text-indigo-300' />
						)}
					</button>
				)}
			</div>
			{!error ? null : (
				<p className='ml-2 text-sm text-red-400 tracking-wide'>{error}</p>
			)}
		</div>
	);
};
