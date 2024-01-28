import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile from '../../../assets/profile.webp';

export const NotificationItem = () => {
	return (
		<div className='hover:bg-nav-selected transition-all p-5 flex justify-between items-center rounded-2xl'>
			<div className='flex justify-center gap-5'>
				<Link to='/'>
					<img
						className='profile ring-2 ring-ring/80 ring-offset-2 ring-offset-primary'
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
				<MoreHorizontal className='text-light' />
			</button>
		</div>
	);
};

export const NotificationActionableItem = () => {
	return (
		<div className='hover:bg-nav-selected transition-all p-5 flex justify-between items-center rounded-2xl'>
			<div className='flex justify-center gap-5'>
				<Link to='/'>
					<img
						className='profile ring-2 ring-ring/80 ring-offset-2 ring-offset-primary'
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
						<button className='button text-light text-sm py-1.5 px-3'>
							Accept
						</button>
						<button className='button-decline'>Decline</button>
					</div>
				</div>
			</div>

			<button>
				<MoreHorizontal className='text-light' />
			</button>
		</div>
	);
};
