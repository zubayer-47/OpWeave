import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { InputType } from '../../types/custom';

type InputProp = {
	name: string;
	// handler: (e: InputType) => void;
	type?: string;
	hint?: string;
	defaultValue?: string;
	inputClass?: string;
	tabIndex?: number;
	// value?: string | null;
	isIcon?: boolean;
	isLoading?: boolean;
	isRequired?: boolean;
	showLabel?: boolean;
	error?: string | null;
	notMatched?: boolean;
};

const Input = ({
	name,
	type = 'text',
	hint = '',
	defaultValue,
	isLoading = false,
	isIcon,
	inputClass,
	isRequired = false,
	showLabel = false,
	error = '',
	tabIndex,
}: InputProp) => {
	const [value, setValue] = useState(defaultValue || '');

	// useEffect(() => {
	// 	setValue(defaultValue || '');
	// }, []);

	const handler = (e: InputType) => {
		setValue(e.target.value);
	};

	return (
		<div className='bg-transparent flex-1'>
			{showLabel && (
				<label
					htmlFor={name}
					className={`title text-sm font-Inter text-light-muted dark:text-dark-muted ${
						!isRequired ? '' : "after:content-['*'] after:text-red"
					}`}
				>
					{hint}
				</label>
			)}
			<input
				type={type}
				name={name}
				id={name}
				tabIndex={tabIndex}
				// className='w-full p-3 rounded-lg bg-transparent outline-none tracking-wider border border-indigo-200'
				className={clsx(
					'block w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none border dark:border-dark-border dark:bg-dark-primary dark:placeholder-dark-muted dark:text-light-primary dark:focus:border-blue-500 transition-all',
					{
						'dark:border-red': !!error,
						'ps-10': isIcon,
					},
					inputClass
				)}
				placeholder={hint}
				value={value}
				onChange={handler}
				autoComplete='off'
				disabled={isLoading}
				required={isRequired}
			/>

			{!error ? null : (
				<p className='ml-2 text-xs text-red tracking-wide'>{error}</p>
			)}
		</div>
	);
};

export default Input;

export const PasswordInput = ({
	name,
	hint = '',
	isLoading = false,
	showLabel = false,
	isRequired,
	error = '',
}: InputProp) => {
	const [show, setShow] = useState(false);
	const [value, setValue] = useState('');

	const handler = (e: InputType) => {
		setValue(e.target.value);
	};
	const onVisible = () => setShow((prev) => !prev);

	return (
		<div className='bg-transparent'>
			{showLabel && (
				<label
					htmlFor={name}
					className={`title text-sm font-Inter text-light-muted dark:text-dark-muted  ${
						!isRequired ? '' : "after:content-['*'] after:text-red"
					}`}
				>
					{hint}
				</label>
			)}
			<div className='relative'>
				{!value ? null : (
					<div className='absolute inset-y-0 end-0 flex items-center pe-3'>
						<button type='button' onClick={onVisible}>
							{show ? (
								<EyeOff className='w-5 h-5 stroke-1 dark:text-dark-muted' />
							) : (
								<Eye className='w-5 h-5 stroke-1 dark:text-dark-muted' />
							)}
						</button>
					</div>
				)}

				<input
					type={show ? 'text' : 'password'}
					name={name}
					id={name}
					className={clsx(
						'block w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none border dark:border-dark-border dark:bg-dark-primary dark:placeholder-dark-muted dark:text-light-primary dark:focus:border-blue-500 transition-all',
						{
							'dark:border-red': !!error,
						}
					)}
					placeholder={hint}
					value={value || ''}
					onChange={handler}
					disabled={isLoading}
					required={isRequired}
				/>
			</div>

			{!error ? null : (
				<p className='ml-2 text-xs text-red tracking-wide'>{error}</p>
			)}
		</div>
	);
};
