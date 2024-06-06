import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile from '../assets/profile2.jpg';

const CommunityList = () => {
	return (
		<Link
			to='/'
			className='flex justify-between items-center hover:dark:bg-dark-bg transition-all px-4'
		>
			<div className='flex justify-start items-center gap-2'>
				<img
					className='profile size-8 lg:size-10'
					// src='https://loremflickr.com/640/480/nature'
					src={profile}
					alt='Community logo'
				/>
				<div>
					<button className='title text-sm lg:text-base leading-4 font-normal block'>
						Dev Community
					</button>
					<span className='title text-xs lg:text-sm text-light-muted dark:text-dark-muted  font-normal'>
						this is for developers
					</span>
				</div>
			</div>
			<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary transition-colors' />
		</Link>
	);
};

export default CommunityList;
