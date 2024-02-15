import { MoreHorizontal } from 'lucide-react';
import profile from '../../../assets/profile2.jpg';

const CommunityItem = () => {
	return (
		<div className='bg-dark-post border border-dark-border rounded-xl flex justify-between items-start px-5 py-5 transition-custom'>
			<div className='flex items-center gap-3'>
				<button>
					<img
						className='profile size-14'
						src={profile}
						alt='community profile'
					/>
				</button>
				<div>
					<button className='title'>
						Dev Community
						{/* <span className='not-sr-only hover:sr-only'>Settings</span> */}
					</button>
					<p className='title muted text-sm'>this is community bio</p>
				</div>
			</div>

			<button>
				<MoreHorizontal className='text-dark-muted' />
			</button>
		</div>
	);
};

export default CommunityItem;
