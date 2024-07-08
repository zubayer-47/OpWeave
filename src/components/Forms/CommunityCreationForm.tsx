import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useCreateCommunityMutation } from '../../features/community/communityApi';
import Button from '../Buttons/Button';
import Input from '../Inputs/Input';

const CommunityCreationForm = () => {
	const [createCommunity] = useCreateCommunityMutation();
	// useKeys<{ name?: string; bio?: string }>({ bio: '', name: '' });
	// console.log('errState :', errState);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = {
			name: formData.get('name'),
			bio: formData.get('bio'),
			description: formData.get('description'),
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
				<label
					htmlFor='description'
					className="title mb-2 after:content-['*'] after:text-red"
				>
					Description
				</label>
				<textarea
					id='description'
					className={
						'w-full border border-dark-border rounded-md px-3 py-2 bg-dark-primary text-light-primary focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-primary/50 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary'
					}
					name='description'
					cols={30}
					rows={2}
				></textarea>
			</div>
			<Button text='Submit' type='submit' fullWidth />
		</form>
	);
};

export default CommunityCreationForm;
