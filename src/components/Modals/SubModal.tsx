import { Bell, Bolt, LogOut, Mail, User2, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.webp';
('lucide-react');

const SubModal = () => {
	return (
		<div className='dark:bg-dark-hover border dark:border-dark-border absolute top-16 right-0 h-fit w-full md:w-96 p-3 rounded-2xl dropdown-item'>
			<div className='absolute inset-0 dark:bg-normal-primary opacity-10'></div>

			<div className='relative divide-y divide-dark-border'>
				<Link
					to={'/profile?sec=timeline'}
					className='flex items-center gap-3 px-4 py-2 dark:hover:bg-normal-primary/15 w-full rounded-xl transition-colors mb-3'
				>
					<img className='profile' src={profile} alt='profile image' />

					<div className='flex flex-col justify-start items-start'>
						<h1 className='title'>A B M Zubayer</h1>
						<span className='title text-sm text-dark-muted'>@zubayerjs</span>
					</div>
				</Link>

				<div className='flex flex-col py-3'>
					<Link
						to={'/profile?sec=timeline'}
						className='subModal-item justify-start gap-4 hover:bg-light-muted/10 dark:hover:bg-dark-secondary'
					>
						<User2 className='icon' />
						<h1 className='title font-medium text-base'>Profile</h1>
					</Link>

					<Link
						to={'/notifications'}
						className='subModal-item hover:bg-light-muted/10 dark:hover:bg-dark-secondary'
					>
						<p className='flex items-center gap-4'>
							<Bell className='icon' />
							<span className='title font-medium text-base'>Notifications</span>
						</p>

						<p className='badge'>
							<span className='badge-text'>3</span>
						</p>
					</Link>

					<Link
						to={'/chat'}
						className='subModal-item hover:bg-light-muted/10 dark:hover:bg-dark-secondary'
					>
						<p className='flex items-center gap-4'>
							<Mail className='icon' />
							<span className='title font-medium text-base'>Messages</span>
						</p>

						<p className='badge'>
							<span className='badge-text'>3</span>
						</p>
					</Link>

					<Link
						to={'/communities'}
						className='subModal-item justify-start gap-4 hover:bg-light-muted/10 dark:hover:bg-dark-secondary'
					>
						<Users2 className='icon' />
						<h1 className='title font-medium text-base'>Communities</h1>
					</Link>

					<Link
						to={'/settings'}
						className='subModal-item justify-start gap-4 hover:bg-light-muted/10 dark:hover:bg-dark-secondary'
					>
						<Bolt className='icon' />
						<h1 className='title font-medium text-base'>Settings</h1>
					</Link>
				</div>

				<div className='pt-3'>
					<button className='subModal-item justify-start gap-4 hover:bg-light-muted/10 dark:hover:bg-dark-secondary'>
						<LogOut className='icon' />
						<h1 className='title font-medium text-base'>Log Out</h1>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SubModal;
