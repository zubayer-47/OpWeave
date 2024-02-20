import { Bell, Bolt, LogOut, Mail, User2, Users2 } from 'lucide-react';
import { memo, useEffect } from 'react';
import profile from '../../assets/profile.webp';
('lucide-react');

const SubModal = () => {
	useEffect(() => {
		console.log('mounted');

		return () => {
			console.log('unmounted');
		};
	}, []);

	return (
		<>
			<button
				type='button'
				className='flex items-center gap-3 px-4 py-2 hover:bg-light-muted/10 dark:hover:bg-light-bg/10 w-full rounded-xl transition-colors mb-3'
			>
				<img className='profile' src={profile} alt='profile image' />

				<div className='flex flex-col justify-start items-start'>
					<h1 className='title'>A B M Zubayer</h1>
					<span className='title text-sm text-dark-muted'>@zubayerjs</span>
				</div>
			</button>

			<div className='flex flex-col gap-2 py-3'>
				<button className='subModal-item justify-start gap-4 hover:bg-light-muted/10 dark:hover:bg-dark-secondary'>
					<User2 className='icon' />
					<h1 className='title font-medium text-base'>Profile</h1>
				</button>

				<button className='subModal-item hover:bg-light-muted/10 dark:hover:bg-dark-secondary'>
					<p className='flex items-center gap-4'>
						<Bell className='icon' />
						<h1 className='title font-medium text-base'>Notifications</h1>
					</p>

					<p className='badge'>
						<span className='badge-text'>3</span>
					</p>
				</button>

				<button className='subModal-item hover:bg-light-muted/10 dark:hover:bg-dark-secondary'>
					<p className='flex items-center gap-4'>
						<Mail className='icon' />
						<h1 className='title font-medium text-base'>Messages</h1>
					</p>

					<p className='badge'>
						<span className='badge-text'>3</span>
					</p>
				</button>

				<button className='subModal-item justify-start gap-4 hover:bg-light-muted/10 dark:hover:bg-dark-secondary'>
					<Users2 className='icon' />
					<h1 className='title font-medium text-base'>Communities</h1>
				</button>

				<button className='subModal-item justify-start gap-4 hover:bg-light-muted/10 dark:hover:bg-dark-secondary'>
					<Bolt className='icon' />
					<h1 className='title font-medium text-base'>Settings</h1>
				</button>
			</div>

			<div className='pt-3'>
				<button className='subModal-item justify-start gap-4 hover:bg-light-muted/10 dark:hover:bg-dark-secondary'>
					<LogOut className='icon' />
					<h1 className='title font-medium text-base'>Log Out</h1>
				</button>
			</div>
		</>
	);
};

const Memoized = memo(SubModal);

export default Memoized;
