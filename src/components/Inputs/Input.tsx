import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
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
}: InputProp) => (
	<div className='bg-transparent flex-1'>
		{showLabel && (
			<label
				htmlFor={name}
				className={`title text-sm font-Inter text-light-muted dark:text-dark-muted ${
					!isRequired ? '' : "after:content-['*'] after:text-red-500"
				}`}
			>
				{hint}
			</label>
		)}
		<input
			type={type}
			name={name}
			id={name}
			// className='w-full p-3 rounded-lg bg-transparent outline-none tracking-wider border border-indigo-200'
			className={`block w-full p-3 text-sm rounded-lg outline-none border focus:border-nav-selected dark:bg-dark-secondary dark:border-dark-border dark:placeholder-dark-muted text-dark-text dark:text-light-text dark:focus:border-blue-500 transition-all ${
				!!error && 'border-cRed'
			}`}
			placeholder={hint}
			value={value || ''}
			onChange={handler}
			autoComplete='off'
			disabled={isLoading}
			required={isRequired}
		/>

		{!error ? null : (
			<p className='ml-2 text-sm text-cRed tracking-wide'>{error}</p>
		)}
	</div>
);

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
					className={`title text-sm font-Inter text-light-muted dark:text-dark-muted  ${
						!isRequired ? '' : "after:content-['*'] after:text-red-500"
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
					className={`block w-full px-3 py-2.5 pe-10 text-sm rounded-lg focus:outline-none border focus:border-nav-selected dark:bg-dark-secondary dark:placeholder-dark-muted text-dark-text dark:text-light-text dark:focus:border-blue-500 ${
						!notMatched ? 'dark:border-dark-border' : 'border-red-500'
					}`}
					placeholder={hint}
					value={value || ''}
					onChange={handler}
					disabled={isLoading}
					required={isRequired}
				/>
			</div>

			{!error ? null : (
				<p className='ml-2 text-sm text-red-400 tracking-wide'>{error}</p>
			)}
		</div>
	);
};
