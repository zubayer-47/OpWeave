import { Link } from 'react-router-dom';
import homeIcon from '../assets/icons/Home.svg';
import logo from '../assets/opweave.svg';
import profile from '../assets/profile.webp';

const Nav = () => {
	return (
		<div className='col-span-3 bg-transparent h-full my-2'>
			<div className='flex items-center gap-2'>
				<img className='w-14 h-14' src={logo} alt='OpWeave Logo' />
				<h1 className='title'>OpWeave</h1>
			</div>

			<div className='flex items-center gap-3 mt-10'>
				<img
					className='w-12 h-12 object-cover rounded-full ring-2 ring-ring/80 ring-offset-2 ring-offset-primary'
					src={profile}
					alt='profile picture'
				/>
				<p>
					<h1 className='title text-lg'>A B M Zubayer</h1>
					<span className='muted'>@zubayerjs</span>
				</p>
			</div>

			<nav className='px-10'>
				<ul className='flex flex-col gap-3'>
					<li className='flex justify-center bg-nav-selected border-border rounded-lg'>
						<Link to='/' className='flex items-center p-3'>
							<img src={homeIcon} alt='Home icon' />
							<h1>Home</h1>
						</Link>
					</li>
					<li className='flex justify-center bg-nav-selected border-border rounded-lg'>
						<Link to='/'>
							<img src={homeIcon} alt='Home icon' />
							<h1>Home</h1>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Nav;
