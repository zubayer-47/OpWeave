import clsx from 'clsx';
import { FC, FormEvent, InputHTMLAttributes, useState } from 'react';
import Button from '../Buttons/Button';

interface Props {
	onSubmit: (data: unknown) => void;
}

const Form: FC<Props> = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		// Initial form data state
	});

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
			<Input label='Name' type='text' name='name' onChange={handleChange} />

			<Input label='Bio' type='text' name='bio' onChange={handleChange} />

			<div className={'flex flex-col'}>
				<label htmlFor='rules' className='title mb-2'>
					Rules
				</label>
				<textarea
					id='rules'
					className={
						'w-full border border-dark-border rounded-md px-3 py-2 bg-dark-primary text-light-primary focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-primary/50 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary'
					}
					name='rules'
					cols={30}
					rows={10}
				></textarea>
			</div>
			<Button text='Submit' type='submit' fullWidth />
		</form>
	);
};

export default Form;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	// Exclude onSubmit
	label?: string;
	error?: string;
}

const Input: FC<InputProps> = ({ label, error, className, name, ...rest }) => {
	return (
		<div className={clsx('flex flex-col', className)}>
			{label && (
				<label htmlFor={name} className='title mb-2'>
					{label}
				</label>
			)}
			<input
				id={name}
				className={clsx(
					'w-full border border-dark-border rounded-md px-3 py-2 bg-dark-primary text-light-primary focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-primary/50 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary',
					error && 'border-red-500'
				)}
				{...rest}
			/>
			{error && <span className='text-sm text-red-500'>{error}</span>}
		</div>
	);
};
