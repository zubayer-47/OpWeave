import { Bell, ChevronDown, Home, LucideIcon, Mail } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import logo from '../assets/opweave.webp';
import { updateAuthModal } from '../features/modal/modalSlice';
import Button from './Buttons/Button';
import Input from './Inputs/Input';
import SubModal from './Modals/SubModal';
// import SubModal from './Modals/SubModal';

// const LazySubModal = lazy(() => import('./Modals/SubModal'));

type NavLinkType = {
	path: string;
	label: string;
	Icon: LucideIcon;
};

const navLinks: NavLinkType[] = [
	{ path: '/', label: 'Home', Icon: Home },
	{
		path: '/notifications',
		label: 'Notifications',
		Icon: Bell,
	},
	{ path: '/chat', label: 'Chat', Icon: Mail },
];

const Nav = () => {
	const { isLoggedIn, user } = useAppSelector((state) => state.auth);
	const location = useLocation();
	const navigate = useNavigate();
	const pathname = location.pathname;

	const dropdownRef = useRef<HTMLDivElement>(null);
	const btnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const elem = dropdownRef.current;
		const btnElem = btnRef.current;

		function clickListener(e: MouseEvent) {
			if (elem && !elem.contains(e.target as Node)) {
				elem?.classList.remove('active');
				// TODO: every time clicking any portion of document, it'll call this method. fix it
				// console.log('first', e.target);

				return;
			}
		}

		function btnClickListener() {
			if (elem?.contains(btnElem)) {
				elem.classList.toggle('active');
			}
		}

		document.addEventListener('click', clickListener);
		btnElem?.addEventListener('click', btnClickListener);
		return () => {
			document.removeEventListener('click', clickListener);
			btnElem?.removeEventListener('click', btnClickListener);
		};
	}, []);

	const activeItem = navLinks.find((link) => link.path === pathname);
	// console.log('activeItem :', activeItem);

	const handleLoginModal = () => {
		updateAuthModal(true);

		navigate('/auth', { state: { from: location } });
	};

	return (
		<nav className='absolute top-0 left-0 right-0 w-full h-[4.75rem] grid items-center dark:bg-dark-hover z-10 dark:shadow-nav px-10'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-5'>
					<Link to='/'>
						<img src={logo} className='profile size-14' alt='OpWeave logo' />
					</Link>

					<form>
						<label
							htmlFor='search'
							className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-light-text'
						>
							Search
						</label>
						<div className='relative'>
							<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
								<svg
									className='size-4 text-light-muted/40 dark:text-dark-muted'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 20 20'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
									/>
								</svg>
							</div>
							<Input
								type='search'
								name='search'
								hint='Search'
								isRequired
								isIcon
							/>
						</div>
					</form>
				</div>

				<div className='flex items-center gap-5'>
					<div className='flex items-center gap-4'>
						{!isLoggedIn && !user
							? null
							: navLinks.map(({ Icon, label, path }) => (
									<NavLink
										to={path}
										className={({ isActive }) =>
											`transition-all duration-200 relative ${
												!isActive ? 'inactive-nav-link block' : 'nav-link'
											}`
										}
									>
										<Icon
											// size={28}
											className={`${
												activeItem?.path === path
													? 'size-6 text-nav-selected'
													: 'size-7 dark:text-inherit'
											}`}
										/>

										{path === '/notifications' && (
											<span className='absolute -top-1.5 right-0 bg-red rounded-full size-4 dark:text-light-primary text-xs flex justify-center items-center overflow-hidden'>
												3
											</span>
										)}

										{path === '/chat' && (
											<span className='absolute -top-1.5 -right-1.5 bg-red rounded-full size-4 dark:text-light-primary text-xs flex justify-center items-center overflow-hidden'>
												3
											</span>
										)}
										<span>{activeItem?.path === path ? label : null}</span>
									</NavLink>
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  ))}

						{!isLoggedIn && !user ? (
							<Button text='Log In' onClick={handleLoginModal} />
						) : null}
					</div>
					{/* {!isLoggedIn && !user ? null : ( */}
					{/* // TODO: 28/4 */}
					<>
						<span className='w-1 bg-dark-muted/25 h-10 rounded-full'></span>
						<div ref={dropdownRef} className='dropdown relative'>
							<button
								ref={btnRef}
								type='button'
								className='px-4 py-2 dark:hover:bg-normal-primary/15 w-full rounded-xl transition-colors dropdown-btn'
							>
								<div className='pointer-events-none flex items-center gap-3'>
									<img
										className='profile'
										src={user?.avatar}
										alt='user profile'
									/>
									<h1 className='title'>{user?.fullname}</h1>
									<ChevronDown className='text-dark-muted' />
								</div>
							</button>

							<SubModal />
						</div>
					</>
					{/* )} */}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
