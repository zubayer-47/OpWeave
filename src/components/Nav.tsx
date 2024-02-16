import { Bell, ChevronDown, Compass, Home, Mail } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/opweave.webp';
import profile from '../assets/profile.webp';
import SubModal from './Modals/SubModal';

const navLinks = [
	{ path: '/', label: 'Home', Icon: Home },
	{ path: '/explore', label: 'Explore', Icon: Compass },
	{ path: '/notifications', label: 'Notifications', Icon: Bell },
	{ path: '/chat', label: 'Chat', Icon: Mail },
];

const Nav = () => {
	const location = useLocation();
	const pathname = location.pathname;
	// console.log('pathname :', pathname);

	const activeItem = navLinks.find((link) => link.path === pathname);
	// console.log('activeItem :', activeItem);

	return (
		<nav className='absolute w-full h-[4.75rem] grid items-center bg-primary z-10 shadow-3xl px-10'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center'>
					<img src={logo} className='profile' alt='OpWeave logo' />
					<input type='search' name='search' />
				</div>

				<div className='flex items-center gap-5'>
					<div className='flex items-center gap-4'>
						{navLinks.map(({ Icon, label, path }) => (
							<NavLink
								key={path}
								to={path}
								className={({ isActive }) =>
									`nav-link transition-all duration-200 ${
										!isActive && 'inactive-nav-link block p-0'
									}`
								}
							>
								<Icon
									className={`${
										activeItem?.path === path
											? 'text-nav-selected '
											: 'text-dark-muted'
									}`}
								/>
								<span className='animate-navlink-open'>
									{activeItem?.path === path ? label : null}
								</span>
							</NavLink>
						))}
					</div>

					<span className='w-1 bg-dark-muted/25 h-10 rounded-full'></span>

					<button
						type='button'
						className='flex items-center gap-3 hover:bg-secondary px-3 py-1.5 rounded-2xl transition-colors relative'
					>
						<img className='profile' src={profile} alt='user profile' />
						<h1 className='title'>A B M Zubayer</h1>
						<ChevronDown className='text-dark-muted' />
						<SubModal />
					</button>
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
