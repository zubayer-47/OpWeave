import { Link } from 'react-router-dom';
import logo from '../assets/opweave.svg';

const CommunityList = () => {
	return (
		<Link
			to='/'
			className='flex justify-between items-center hover:dark:bg-dark px-4 py-3.5 transition-all'
		>
			<div className='flex justify-start items-center gap-5'>
				<img
					className='w-12 h-12 rounded-full object-cover'
					src={logo}
					alt='Community logo'
				/>
				<div>
					<button className='title font-normal block'>Dev Community</button>
					<span className='title text-base dark:text-dark-muted text-light-muted font-normal'>
						this is for developers
					</span>
				</div>
			</div>
			<button className='button'>Join</button>
		</Link>
	);
};

export default CommunityList;
