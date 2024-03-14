import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile from '../../../assets/profile.webp';

export const NotificationItem = () => {
	return (
		<Link
			to={'/'}
			className='dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all p-5 flex justify-between items-center rounded-2xl'
		>
			<div className='flex justify-center gap-5'>
				<Link to='/'>
					<img
						className='profile'
						src={profile}
						alt="A B M Zubayer's profile"
					/>
				</Link>
				<div className='flex flex-col'>
					<Link to='/' className='title'>
						A B M Zubayer
					</Link>
					<span className='title text-sm text-dark-muted'>3s ago</span>
				</div>
			</div>

			<button>
				<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary' />
			</button>
		</Link>
	);
};

export const NotificationActionableItem = () => {
	return (
		<div className='dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all p-5 flex justify-between items-center rounded-2xl'>
			<div className='flex justify-center gap-5'>
				<Link to='/'>
					<img
						className='profile'
						src={profile}
						alt="A B M Zubayer's profile"
					/>
				</Link>
				<div className='flex flex-col'>
					<Link to='/' className='title'>
						A B M Zubayer
					</Link>
					<span className='title text-sm text-dark-muted'>3s ago</span>

					<div className='flex items-center gap-3 mt-3'>
						<button className='button text-light-text text-sm py-1.5 px-3'>
							Accept
						</button>
						<button className='button-decline'>Decline</button>
					</div>
				</div>
			</div>

			<button>
				<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary' />
			</button>
		</div>
	);
};
