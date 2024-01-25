import { NavLink } from 'react-router-dom';
import homeIcon from '../assets/icons/Home.svg';
import bellIcon from '../assets/icons/bell.svg';
import bookmarkIcon from '../assets/icons/bookmark.svg';
import exploreIcon from '../assets/icons/explore.svg';
import userIcon from '../assets/icons/user.svg';
import usersIcon from '../assets/icons/users.svg';
import logo from '../assets/opweave.svg';
import profile from '../assets/profile.webp';

const Nav = () => {
	return (
		<div className='col-span-3 mr-16 bg-transparent h-full py-2 border-r dark:border-dark-border border-light-border'>
			<div className='flex items-center gap-2'>
				<img className='w-14 h-14' src={logo} alt='OpWeave Logo' />
				<h1 className='title'>OpWeave</h1>
			</div>

			<div className='flex items-center gap-3 mt-10'>
				<img
					className='profile ring-2 ring-ring/80 ring-offset-2 ring-offset-primary'
					src={profile}
					alt='profile picture'
				/>
				<div>
					<h1 className='title text-lg'>A B M Zubayer</h1>
					<span className='muted'>@zubayerjs</span>
				</div>
			</div>

			<nav className='2xl:pr-24 mt-10'>
				<div>
					<div className='flex flex-col gap-3'>
						<NavLink
							to='/'
							className={({ isActive }) =>
								isActive
									? 'flex items-stretch p-3 gap-5 nav-link'
									: 'flex items-stretch p-3 gap-5 nav-link bg-transparent border-none'
							}
						>
							<img src={homeIcon} alt='Home icon' />
							<h1 className='title text-lg pt-1'>Home</h1>
						</NavLink>
						<NavLink
							to='/explore'
							className={({ isActive }) =>
								`flex items-stretch p-3 gap-5 nav-link ${
									isActive ? '' : 'inactive-nav-link'
								}`
							}
						>
							<img src={exploreIcon} alt='Home icon' />
							<h1 className='title text-lg pt-1'>Explore</h1>
						</NavLink>

						<NavLink
							to='/notification'
							className={({ isActive }) =>
								`flex items-stretch p-3 gap-5 nav-link ${
									isActive ? '' : 'inactive-nav-link'
								}`
							}
						>
							<img src={bellIcon} alt='Home icon' />
							<h1 className='title text-lg pt-1'>Notification</h1>
						</NavLink>

						<NavLink
							to='/communities'
							className={({ isActive }) =>
								`flex items-stretch p-3 gap-5 nav-link ${
									isActive ? '' : 'inactive-nav-link'
								}`
							}
						>
							<img src={usersIcon} alt='Home icon' />
							<h1 className='title text-lg pt-1'>Communities</h1>
						</NavLink>

						<NavLink
							to='/bookmarks'
							className={({ isActive }) =>
								`flex items-stretch p-3 gap-5 nav-link ${
									isActive ? '' : 'inactive-nav-link'
								}`
							}
						>
							<img src={bookmarkIcon} alt='Home icon' />
							<h1 className='title text-lg pt-1'>Bookmarks</h1>
						</NavLink>

						<NavLink
							to='/profile'
							className={({ isActive }) =>
								`flex items-stretch p-3 gap-5 nav-link ${
									isActive ? '' : 'inactive-nav-link'
								}`
							}
						>
							<img src={userIcon} alt='Home icon' />
							<h1 className='title text-lg pt-1'>Profile</h1>
						</NavLink>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
