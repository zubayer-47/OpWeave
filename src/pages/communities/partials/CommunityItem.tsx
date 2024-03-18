import { Link } from 'react-router-dom';
import profile from '../../../assets/profile2.jpg';
import HorizontalMore from '../../../components/Buttons/HorizontalMore';
import { Community } from './FavCommunities';

const CommunityItem = ({ avatar, bio, name }: Partial<Community>) => {
	return (
		<div className='snap-center dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all p-5 flex justify-between items-center rounded-2xl'>
			<div className='flex justify-center items-center gap-5'>
				<Link to='/'>
					<img
						className='profile size-14'
						// src={avatar || 'https://loremflickr.com/640/480/nature'}
						src={avatar || profile}
						alt='community profile'
					/>
				</Link>
				<div>
					<Link to='/' className='title'>
						{name || 'Dev Community'}
						{/* <span className='not-sr-only hover:sr-only'>Settings</span> */}
					</Link>
					<p className='title font-normal text-sm text-dark-muted'>
						{bio || 'this is community bio'}
					</p>
				</div>
			</div>

			<HorizontalMore />
		</div>
	);
};

export default CommunityItem;
