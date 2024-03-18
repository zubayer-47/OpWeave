import { Link } from 'react-router-dom';
import profile from '../../../assets/profile2.jpg';
import { Community } from './FavCommunities';

const HorizontalCommunityItem = ({ avatar, bio, name }: Partial<Community>) => {
	return (
		<div className='snap-center min-w-72 community_suggestions rounded-2xl dark:hover:opacity-80 border dark:border-dark-border transition-all p-2 select-none'>
			<div className='space-y-4'>
				<Link to='/'>
					<img
						className='profile rounded-t-md rounded-b-none w-full h-28 object-cover'
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
		</div>
	);
};

export default HorizontalCommunityItem;
