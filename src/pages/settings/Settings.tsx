import clsx from 'clsx';
import { PencilLine } from 'lucide-react';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAppSelector } from '../../app/hooks';
import Button from '../../components/Buttons/Button';
import {
	useUpdateProfilePictureMutation,
	useUpdateUserMutation,
} from '../../features/user/userApi';
import useAuthError from '../../hooks/useAuthError';
import CenterLayout from '../../layouts/CenterLayout';
import { FormHandler, InputType } from '../../types/custom';

const Settings = () => {
	const user = useAppSelector((state) => state.auth.user);
	// const access_token = localStorage.getItem('access_token');

	// const { data } = useGetProfilePictureQuery(user?.id || skipToken);
	const [updateProfilePicture] = useUpdateProfilePictureMutation();
	const [updateUser, { isError, error, isLoading }] = useUpdateUserMutation();
	const [errState, { resetErr }] = useAuthError({ error });

	const handleFile = async (e: InputType) => {
		if (e.target?.files) {
			const content = e.target.files[0];

			const formData = new FormData();
			formData.append('avatar', content);

			const promise = updateProfilePicture(formData).unwrap();

			toast.promise(promise, {
				loading: 'saving...',
				success: 'successfully saved!',
				error: 'Cloud not save.',
			});
		}
	};

	const handleSubmit: FormHandler = (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = {
			fullname: formData.get('fullname'),
			// username: formData.get('username'),
			bio: formData.get('bio'),
		};

		resetErr();

		toast.promise(
			updateUser({
				id: user?.id || '',
				fullname: data.fullname?.toString(),
				bio: data.bio?.toString(),
			}).unwrap(),
			{
				loading: 'Saving...',
				success: 'Info saved!',
				error: 'Could not save.',
			}
		);
	};

	return (
		// <div className='2xl:mx-96 my-20'>
		<CenterLayout hasNav>
			<div className='max-w-100 mx-auto py-10 px-2'>
				<div className='w-fit relative group'>
					<LazyLoadImage
						src={user?.avatar}
						className='size-36 lg:size-48 object-cover rounded-full'
						alt='Post Image'
						effect='blur'
					/>

					<form encType='multipart/form-data'>
						<label htmlFor='upload_profile'>
							<div className='absolute left-0 bottom-2  rounded-lg focus:outline-none border dark:border-dark-border dark:bg-dark-primary px-2 md:px-3 py-1.5 md:py-2 dark:text-light-primary text-xs flex justify-center items-center overflow-hidden cursor-pointer'>
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
					{/* <Input
					defaultValue={user?.fullname}
					hint='Name'
					name='fullname'
					showLabel
				/> */}

					<div className='bg-transparent flex-1'>
						<label
							htmlFor='fullname'
							className="title text-sm font-Inter text-light-muted dark:text-dark-muted after:content-['*'] after:text-red"
						>
							Full Name
						</label>
						<input
							type='text'
							name='fullname'
							id='fullname'
							className={clsx(
								'block w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none border dark:border-dark-border dark:bg-dark-primary dark:placeholder-dark-muted dark:text-light-primary dark:focus:border-blue-500 transition-all',
								{
									'dark:border-red': errState.fullname,
								}
							)}
							placeholder='write your fullname'
							defaultValue={user?.fullname}
							autoComplete='off'
							disabled={isLoading}
							required
						/>

						{!isError ? null : (
							<p className='ml-2 text-xs text-red tracking-wide'>
								{errState.fullname}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor='bio'
							className='title text-sm font-Inter text-light-muted dark:text-dark-muted'
						>
							Bio
						</label>
						<textarea
							name='bio'
							defaultValue={user?.bio}
							cols={10}
							rows={5}
							className={clsx(
								'block w-full px-3 py-2.5 text-sm text-dark-text rounded-lg focus:outline-none border dark:border-dark-border dark:bg-dark-primary dark:placeholder-dark-muted dark:text-light-primary dark:focus:border-blue-500 transition-all'
							)}
							placeholder='Your opinion...'
						></textarea>
					</div>

					<Button
						type='submit'
						text='Update'
						className='bg-green hover:bg-green/80 dark:focus:ring-2 dark:focus:ring-green/70 border-green/80 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary'
						size='small'
					/>
				</form>
			</div>
		</CenterLayout>
	);
};

export default Settings;
