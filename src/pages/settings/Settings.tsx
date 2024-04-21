import clsx from 'clsx';
import { PencilLine } from 'lucide-react';
import profile from '../../assets/profile2.jpg';
import Button from '../../components/Buttons/Button';
import Input from '../../components/Inputs/Input';

const Settings = () => {
	return (
		<div className='mx-96 my-20'>
			<div className='w-fit relative group'>
				<img
					src={profile}
					className='size-48 object-cover rounded-full'
					alt=''
				/>

				<button
					type='button'
					className='absolute left-0 bottom-2  rounded-lg focus:outline-none border dark:border-dark-border dark:bg-dark-primary px-3 py-2 dark:text-light-primary text-xs flex justify-center items-center overflow-hidden'
				>
					<PencilLine className='mr-2 size-4' strokeWidth={1.8} />
					<span className='title text-sm'>Edit</span>
				</button>
			</div>

			<div className='flex flex-col gap-5 mt-10 col-span-2'>
				<Input
					hint='Name'
					handler={() => {
						console.log('first');
					}}
					name='name'
					showLabel
				/>
				<Input
					hint='Username'
					handler={() => {
						console.log('first');
					}}
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
						className={clsx(
							'block w-full px-3 py-2.5 text-sm text-dark-text rounded-lg focus:outline-none border dark:border-dark-border dark:bg-dark-primary dark:placeholder-dark-muted dark:text-light-primary dark:focus:border-blue-500 transition-all'
						)}
						placeholder='Your opinion...'
					></textarea>
				</div>

				<Button
					text='Update'
					className='bg-green hover:bg-green/80 dark:focus:ring-2 dark:focus:ring-green/70 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary'
					size='small'
				/>
			</div>
		</div>
	);
};

export default Settings;
