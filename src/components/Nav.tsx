import {
	Bell,
	ChevronDown,
	Compass,
	Home,
	LucideIcon,
	Mail,
} from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import PermissionWrapper from '../Routes/PermissionWrapper';
import logo from '../assets/opweave.webp';
import profile from '../assets/profile.webp';
import { UserRight } from '../contexts/user/types';
import useModal from '../hooks/useModal';
import SubModal from './Modals/SubModal';

type NavLinkType = {
	path: string;
	label: string;
	Icon: LucideIcon;
	permission: UserRight[] | UserRight;
};

const permissions = {
	all: [UserRight.ADMIN, UserRight.MODER, UserRight.USER],
	user: UserRight.USER,
	mod: UserRight.MODER,
};

const navLinks: NavLinkType[] = [
	{ path: '/', label: 'Home', Icon: Home, permission: permissions.all },
	{
		path: '/explore',
		label: 'Explore',
		Icon: Compass,
		permission: permissions.all,
	},
	{
		path: '/notifications',
		label: 'Notifications',
		Icon: Bell,
		permission: permissions.all,
	},
	{ path: '/chat', label: 'Chat', Icon: Mail, permission: permissions.all },
];

const Nav = () => {
	// const { state } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const pathname = location.pathname;
	// console.log('pathname :', pathname);
	const { updateModal } = useModal();

	const activeItem = navLinks.find((link) => link.path === pathname);
	// console.log('activeItem :', activeItem);

	const handleLoginModal = () => {
		updateModal(true);

		navigate('/auth', { state: { from: location } });
	};

	return (
		<nav className='absolute w-full h-[4.75rem] grid items-center bg-light-modal dark:bg-dark-bg z-10 drop-shadow-md dark:shadow-3xl px-10'>
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
							<input
								type='search'
								name='search'
								className='block w-full px-3 py-2.5 ps-10 text-sm text-dark-text rounded-lg focus:outline-none border focus:border-nav-selected dark:bg-dark-secondary dark:border-dark-border dark:placeholder-dark-muted dark:text-light-text dark:focus:border-blue-500'
								placeholder='Search'
								required
							/>
						</div>
					</form>
				</div>

				<div className='flex items-center gap-5'>
					<div className='flex items-center gap-4'>
						{navLinks.map(({ Icon, label, path, permission }) => (
							<PermissionWrapper key={path} permission={permission} links>
								<NavLink
									to={path}
									className={({ isActive }) =>
										`transition-all duration-200 ${
											!isActive ? 'inactive-nav-link block' : 'nav-link'
										}`
									}
								>
									<Icon
										// size={28}
										className={`${
											activeItem?.path === path
												? 'size-6 text-nav-selected'
												: 'size-7 text-light-muted dark:text-dark-muted'
										}`}
									/>
									<span className='animate-navlink-open'>
										{activeItem?.path === path ? label : null}
									</span>
								</NavLink>
							</PermissionWrapper>
						))}

						<PermissionWrapper permission={UserRight.FREE} links>
							<button
								type='button'
								className='button px-7 py-2.5'
								onClick={handleLoginModal}
							>
								Log In
							</button>
						</PermissionWrapper>
					</div>

					<PermissionWrapper
						permission={[UserRight.ADMIN, UserRight.MODER, UserRight.USER]}
						links
					>
						<span className='w-1 bg-dark-muted/25 h-10 rounded-full'></span>
						<div className='group'>
							<button
								type='button'
								className='flex items-center gap-3 hover:bg-light-muted/10 dark:hover:bg-dark-secondary px-3 py-1.5 rounded-2xl transition-colors relative'
							>
								<img className='profile' src={profile} alt='user profile' />
								<h1 className='title'>A B M Zubayer</h1>
								<ChevronDown className='text-dark-muted' />
							</button>
							<div className='group-focus-within:block group-focus-within:animate-submodal-open hidden absolute top-24 -right-1/2 w-full md:w-96 dark:shadow-sub-modal bg-light-modal dark:bg-dark-subModal p-3 rounded-2xl divide-y divide-dark-muted/50'>
								<SubModal />
							</div>
						</div>
					</PermissionWrapper>
				</div>
			</div>
		</nav>
	);
};

export default Nav;

// import { NavLink } from 'react-router-dom';
// import homeIcon from '../assets/icons/Home.svg';
// import bellIcon from '../assets/icons/bell.svg';
// import bookmarkIcon from '../assets/icons/bookmark.svg';
// import exploreIcon from '../assets/icons/explore.svg';
// import userIcon from '../assets/icons/user.svg';
// import usersIcon from '../assets/icons/users.svg';
// import logo from '../assets/opweave.svg';
// import profile from '../assets/profile.webp';
// import useController from '../hooks/useController';

// const Nav = () => {
// 	const { openPostModal } = useController();

// 	return (
// 		<div className='col-span-3 mr-16 bg-transparent h-full py-2 border-r dark:border-dark-border border-light-border'>
// 			<div className='flex items-center gap-2'>
// 				<img className='size-14' src={logo} alt='OpWeave Logo' />
// 				<h1 className='title text-2xl'>OpWeave</h1>
// 			</div>

// 			<div className='flex items-center gap-3 mt-10'>
// 				<img
// 					className='profile ring-2 ring-ring/80 ring-offset-2 ring-offset-primary'
// 					src={profile}
// 					alt='profile picture'
// 				/>
// 				<div>
// 					<h1 className='title '>A B M Zubayer</h1>
// 					<span className='muted'>@zubayerjs</span>
// 				</div>
// 			</div>

// 			<nav className='2xl:pr-24 mt-10'>
// 				<div>
// 					<div className='flex flex-col gap-3'>
// 						<NavLink
// 							to='/'
// 							className={({ isActive }) =>
// 								isActive
// 									? 'flex items-stretch p-3 gap-5 nav-link'
// 									: 'flex items-stretch p-3 gap-5 nav-link bg-transparent border-none'
// 							}
// 						>
// 							<img src={homeIcon} alt='Home icon' />
// 							<h1 className='title  pt-1'>Home</h1>
// 						</NavLink>
// 						<NavLink
// 							to='/explore'
// 							className={({ isActive }) =>
// 								`flex items-stretch p-3 gap-5 nav-link ${
// 									isActive ? '' : 'inactive-nav-link'
// 								}`
// 							}
// 						>
// 							<img src={exploreIcon} alt='Home icon' />
// 							<h1 className='title  pt-1'>Explore</h1>
// 						</NavLink>

// 						<NavLink
// 							to='/notifications'
// 							className={({ isActive }) =>
// 								`flex items-stretch p-3 gap-5 nav-link ${
// 									isActive ? '' : 'inactive-nav-link'
// 								}`
// 							}
// 						>
// 							<img src={bellIcon} alt='Home icon' />
// 							<h1 className='title  pt-1'>Notifications</h1>
// 						</NavLink>

// 						<NavLink
// 							to='/communities'
// 							className={({ isActive }) =>
// 								`flex items-stretch p-3 gap-5 nav-link ${
// 									isActive ? '' : 'inactive-nav-link'
// 								}`
// 							}
// 						>
// 							<img src={usersIcon} alt='Home icon' />
// 							<h1 className='title  pt-1'>Communities</h1>
// 						</NavLink>

// 						<NavLink
// 							to='/bookmarks'
// 							className={({ isActive }) =>
// 								`flex items-stretch p-3 gap-5 nav-link ${
// 									isActive ? '' : 'inactive-nav-link'
// 								}`
// 							}
// 						>
// 							<img src={bookmarkIcon} alt='Home icon' />
// 							<h1 className='title  pt-1'>Bookmarks</h1>
// 						</NavLink>

// 						<NavLink
// 							to='/profile'
// 							className={({ isActive }) =>
// 								`flex items-stretch p-3 gap-5 nav-link ${
// 									isActive ? '' : 'inactive-nav-link'
// 								}`
// 							}
// 						>
// 							<img src={userIcon} alt='Home icon' />
// 							<h1 className='title  pt-1'>Profile</h1>
// 						</NavLink>

// 						<button
// 							className='title button py-3.5 mt-5'
// 							onClick={openPostModal}
// 						>
// 							Create Post
// 						</button>
// 					</div>
// 				</div>
// 			</nav>
// 		</div>
// 	);
// };

// export default Nav;
