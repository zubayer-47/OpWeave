import { Bell, Bolt, LogOut, Mail, User2, Users2 } from 'lucide-react';
import { memo } from 'react';
import profile from '../../assets/profile.webp';
('lucide-react');

const SubModal = () => {
	return (
		<div className='group-focus-within:block group-focus-within:animate-submodal-open absolute top-24 right-12 w-full md:w-96 dark:shadow-sub-modal bg-light-modal dark:bg-dark-subModal p-3 rounded-2xl divide-y divide-dark-muted/50'>
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
						<span className='title font-medium text-base'>Notifications</span>
					</p>

					<p className='badge'>
						<span className='badge-text'>3</span>
					</p>
				</button>

				<button className='subModal-item hover:bg-light-muted/10 dark:hover:bg-dark-secondary'>
					<p className='flex items-center gap-4'>
						<Mail className='icon' />
						<span className='title font-medium text-base'>Messages</span>
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
		</div>
	);
};

const Memoized = memo(SubModal);

export default Memoized;
