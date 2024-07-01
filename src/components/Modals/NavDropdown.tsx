import { Bolt, LogOut, User2, Users2 } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userLoggedOut } from '../../features/auth/authSlice';

const NavDropdown = () => {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	const logout = () => {
		dispatch(userLoggedOut());
		localStorage.clear();

		console.log('clearning');
	};

	return (
		<div className='dark:bg-dark-hover border dark:border-dark-border absolute top-5 right-0 h-fit md:w-96 w-full p-3 rounded-2xl dropdown-item'>
			<div className='absolute inset-0 dark:bg-normal-primary opacity-10'></div>

			<div className='relative divide-y divide-dark-border'>
				<Link
					to={`/profile/${user?.username}?sec=timeline`}
					className='flex items-center gap-3 px-4 py-2 dark:hover:bg-normal-primary/15 w-full rounded-xl transition-colors mb-3'
				>
					<LazyLoadImage
						src={user?.avatar}
						className='profile size-10'
						alt='profile image'
						effect='blur'
					/>

					<div className='flex flex-col justify-start items-start'>
						<h1 className='title'>{user?.fullname}</h1>
						<span className='title text-sm text-dark-muted'>
							{user?.username}
						</span>
					</div>
				</Link>

				<div className='flex flex-col py-3'>
					<Link
						to={`/profile/${user?.username}?sec=timeline`}
						className='subModal-item justify-start gap-4 hover:bg-light-muted/10 dark:hover:bg-dark-secondary'
					>
						<User2 className='icon' />
						<h1 className='title font-medium text-base'>Profile</h1>
					</Link>

					{/* <Link
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
					</Link> */}

					{/* <Link
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
					</Link> */}

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
					<button
						onClick={logout}
						type='button'
						className='subModal-item justify-start gap-4 hover:bg-light-muted/10 dark:hover:bg-dark-secondary'
					>
						<LogOut className='icon' />
						<h1 className='title font-medium text-base'>Log Out</h1>
					</button>
				</div>
			</div>
		</div>
	);
};

export default NavDropdown;
