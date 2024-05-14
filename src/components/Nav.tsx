import { ChevronDown, Home, LucideIcon } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import defaultAvatar from '../assets/default.jpg';
import logo from '../assets/opweave.webp';
import { updateModal } from '../features/modal/modalSlice';
import Button from './Buttons/Button';
import ClickableDropdown from './ClickableDropdown';
import Input from './Inputs/Input';
import NavDropdown from './Modals/NavDropdown';

// const LazySubModal = lazy(() => import('./Modals/SubModal'));

type NavLinkType = {
	path: string;
	label: string;
	Icon: LucideIcon;
};

const navLinks: NavLinkType[] = [{ path: '/', label: 'Home', Icon: Home }];

const Nav = () => {
	const user = useAppSelector((state) => state.auth.user);

	const location = useLocation();
	const navigate = useNavigate();
	const pathname = location.pathname;
	const activeItem = navLinks.find((link) => link.path === pathname);

	const handleLoginModal = () => {
		updateModal();

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
								tabIndex={1}
							/>
						</div>
					</form>
				</div>

				<div className='flex items-center gap-5'>
					<div className='flex items-center gap-4'>
						{!user
							? null
							: navLinks.map(({ Icon, label, path }) => (
									<NavLink
										key={path}
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

										<span>{activeItem?.path === path ? label : null}</span>
									</NavLink>
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  ))}

						{!user ? <Button text='Log In' onClick={handleLoginModal} /> : null}
					</div>
					<ClickableDropdown
						button={
							<button
								type='button'
								className='px-4 py-2 dark:hover:bg-normal-primary/15 w-full rounded-xl transition-colors dropdown-btn'
							>
								<div className='pointer-events-none flex items-center gap-3'>
									<img
										className='profile'
										src={user?.avatar || defaultAvatar}
										alt='user profile'
									/>
									<h1 className='title'>{user?.fullname}</h1>
									<ChevronDown className='text-dark-muted' />
								</div>
							</button>
						}
					>
						<span className='w-1 bg-dark-muted/25 h-10 rounded-full'></span>
						<div className='dropdown relative'>
							<NavDropdown />
						</div>
					</ClickableDropdown>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
