import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useCreateCommunityMutation } from '../../features/community/communityApi';
import { useKeys } from '../../hooks/useAuthError';
import Button from '../Buttons/Button';
import Input from '../Inputs/Input';

// interface Props {
// 	onSubmit: (data: unknown) => void;
// }

const CreateCommunityForm = () => {
	const [createCommunity] = useCreateCommunityMutation();
	useKeys<{ name?: string; bio?: string }>({ bio: '', name: '' });
	// console.log('errState :', errState);

	// const [formData, setFormData] = useState({
	// 	// Initial form data state
	// });

	// const handleChange = (e: FormEvent<HTMLInputElement>) => {
	// 	setFormData({
	// 		...formData,
	// 		[e.currentTarget.name]: e.currentTarget.value,
	// 	});
	// };

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = {
			name: formData.get('name'),
			bio: formData.get('bio'),
			rules: formData.get('rules'),
		};

		// resetErr();

		toast.promise(createCommunity(data).unwrap(), {
			loading: 'Creating...',
			success: 'community successfully created',
			error: 'Could not create.',
		});

		e.currentTarget.reset();
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
			<Input
				hint='Name'
				type='text'
				name='name'
				inputClass='w-full border border-dark-border rounded-md px-3 py-2 bg-dark-primary text-light-primary focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-primary/50 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary dark:focus:border-dark-border'
				isRequired
				showLabel
				defaultValue=''
				// error={errState.}
			/>

			<Input
				hint='Bio'
				type='text'
				name='bio'
				inputClass='w-full border border-dark-border rounded-md px-3 py-2 bg-dark-primary text-light-primary focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-primary/50 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary dark:focus:border-dark-border'
				isRequired
				showLabel
			/>

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

export default CreateCommunityForm;

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
// 	// Exclude onSubmit
// 	label?: string;
// 	error?: string;
// }

// const Input: FC<InputProps> = ({ label, error, className, name, ...rest }) => {
// 	return (
// 		<div className={clsx('flex flex-col', className)}>
// 			{label && (
// 				<label htmlFor={name} className='title mb-2'>
// 					{label}
// 				</label>
// 			)}
// 			<input
// 				id={name}
// 				className={clsx(
// 					'w-full border border-dark-border rounded-md px-3 py-2 bg-dark-primary text-light-primary focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-primary/50 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary',
// 					error && 'border-red-500'
// 				)}
// 				{...rest}
// 			/>
// 			{error && <span className='text-sm text-red-500'>{error}</span>}
// 		</div>
// 	);
// };
