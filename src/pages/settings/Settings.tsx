import clsx from 'clsx';
import { Bell, Compass, PencilLine } from 'lucide-react';
import profile from '../../assets/profile2.jpg';
import Button from '../../components/Buttons/Button';
import Hr from '../../components/Hr';
import Input from '../../components/Inputs/Input';

const Settings = () => {
	return (
		<div className='mx-96 mt-40'>
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

				<div className='dark:bg-dark-primary px-1 flex-col border dark:border-dark-border rounded-xl z-10 group-focus:flex hidden'>
					<button
						// onClick={handleClose}
						className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
					>
						<Compass className='text-light-primary' strokeWidth={1.5} />
						<h3 className='title text-sm font-normal'>More Option</h3>
					</button>
					<Hr />
					<button
						// onClick={handleClose}
						className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
					>
						<Bell className='text-light-primary' strokeWidth={1.5} />
						<h3 className='title text-sm font-normal'>More Option</h3>
					</button>
				</div>
			</div>

			<div className='flex flex-col gap-5 mt-20 col-span-2'>
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
