import clsx from 'clsx';
import { PencilLine } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppSelector } from '../../app/hooks';
import Button from '../../components/Buttons/Button';
import Input from '../../components/Inputs/Input';
import { User } from '../../features/auth/types';
import {
	useGetProfilePictureQuery,
	useUpdateProfilePictureMutation,
} from '../../features/user/userApi';
import { FormHandler, InputType } from '../../types/custom';

const Settings = () => {
	const avatar = useAppSelector((state) => state.auth.user?.avatar);
	const user_data = localStorage.getItem('user');
	const user = !user_data ? null : (JSON.parse(user_data) as User);

	const { data, isSuccess } = useGetProfilePictureQuery(user?.id);
	const [updateProfilePicture] = useUpdateProfilePictureMutation();

	const handleFile = async (e: InputType) => {
		if (e.target?.files) {
			const content = e.target.files[0];

			const formData = new FormData();
			formData.append('avatar', content);

			const promise = updateProfilePicture({
				userId: user?.id,
				payload: formData,
			}).unwrap();

			toast.promise(promise, {
				loading: 'saving...',
				success: 'successfully saved!',
				error: 'Cloud not save.',
			});
		}
	};

	const handleSubmit: FormHandler = (e) => {
		e.preventDefault();

		// const formData = new FormData(e.currentTarget);
		// const data = {
		// 	name: formData.get('name'),
		// 	username: formData.get('username'),
		// 	// bio: formData.get('bio'),
		// };

		// toast.promise(update({ userId: user?.id, payload: data }).unwrap(), {
		// 	loading: 'Saving...',
		// 	success: 'Info saved!',
		// 	error: 'Could not save.',
		// });
	};

	return (
		<div className='mx-96 my-20'>
			<div className='w-fit relative group'>
				<img
					src={
						avatar ||
						(isSuccess && data?.avatar) ||
						'http://www.gravatar.com/avatar'
					}
					className='size-48 object-cover rounded-full'
					alt=''
					loading='lazy'
				/>

				<form encType='multipart/form-data'>
					<label htmlFor='upload_profile'>
						<div className='absolute left-0 bottom-2  rounded-lg focus:outline-none border dark:border-dark-border dark:bg-dark-primary px-3 py-2 dark:text-light-primary text-xs flex justify-center items-center overflow-hidden cursor-pointer'>
							<PencilLine className='mr-2 size-4' strokeWidth={1.8} />
							<span className='title text-sm'>Edit</span>
						</div>
						<input
							type='file'
							name=''
							id='upload_profile'
							className='hidden'
							onChange={handleFile}
							accept='image/png, image/jpg, image/webp'
						/>
					</label>
				</form>
			</div>

			<form
				className='flex flex-col gap-5 mt-10 col-span-2'
				onSubmit={handleSubmit}
			>
				<Input
					defaultValue={user?.fullname}
					hint='Name'
					name='name'
					showLabel
				/>
				{/* // TODO: 29/4 take a look at default value */}
				<Input
					defaultValue={user?.username}
					hint='Username'
					name='username'
					showLabel
				/>

				<div>
					<label
						htmlFor='bio'
						className='title text-sm font-Inter text-light-muted dark:text-dark-muted'
					>
						Bio
					</label>
					<textarea
						name='bio'
						// ref={textAreaRef}
						// onChange={onChange}
						// value={text}
						cols={10}
						rows={5}
						// defaultValue={user.}
						className={clsx(
							'block w-full px-3 py-2.5 text-sm text-dark-text rounded-lg focus:outline-none border dark:border-dark-border dark:bg-dark-primary dark:placeholder-dark-muted dark:text-light-primary dark:focus:border-blue-500 transition-all'
						)}
						placeholder='Your opinion...'
					></textarea>
				</div>

				<Button
					type='submit'
					text='Update'
					className='bg-green hover:bg-green/80 dark:focus:ring-2 dark:focus:ring-green/70 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary'
					size='small'
				/>
			</form>
		</div>
	);
};

export default Settings;
