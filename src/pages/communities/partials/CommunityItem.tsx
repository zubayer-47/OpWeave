import { Link } from 'react-router-dom';
import profile from '../../../assets/profile2.jpg';
import HorizontalMore from '../../../components/Buttons/HorizontalMore';

const CommunityItem = () => {
	return (
		<div className='snap-center dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all p-5 flex justify-between items-center rounded-2xl'>
			<div className='flex justify-center items-center gap-5'>
				<Link to='/'>
					<img
						className='profile size-14'
						src={profile}
						alt='community profile'
					/>
				</Link>
				<div>
					<Link to='/' className='title'>
						Dev Community
						{/* <span className='not-sr-only hover:sr-only'>Settings</span> */}
					</Link>
					<p className='title font-normal text-sm text-dark-muted'>
						this is community bio
					</p>
				</div>
			</div>

			<HorizontalMore />
		</div>
	);
};

export default CommunityItem;
