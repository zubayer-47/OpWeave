import { Bell, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile from '../../../assets/profile2.jpg';
import HorizontalMore from '../../../components/Buttons/HorizontalMore';
import { Community } from '../../../types/custom';

interface Props extends Partial<Community> {
	id: string;
	updatedOptionId: string;
	handleOption: (id: string) => void;
	handleClose: () => void;
}

const CommunityItem = ({
	id,
	avatar,
	bio,
	name,
	updatedOptionId,
	handleOption,
	handleClose,
}: Props) => {
	return (
		<div className='snap-center dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all p-5 flex justify-between items-center rounded-2xl relative'>
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

			<HorizontalMore onClick={() => handleOption(id)} onBlur={handleClose} />

			{updatedOptionId === id ? (
				<div className='dark:bg-dark-primary px-1 absolute right-3 -bottom-20 flex flex-col border dark:border-dark-border rounded-xl z-10'>
					<button
						onClick={handleClose}
						className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
					>
						<Compass className='text-light-primary' strokeWidth={1.5} />
						<h3 className='title text-sm font-normal'>More Option</h3>
					</button>
					<hr className='border-t-2 dark:border-dark-border' />
					<button
						onClick={handleClose}
						className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
					>
						<Bell className='text-light-primary' strokeWidth={1.5} />
						<h3 className='title text-sm font-normal'>More Option</h3>
					</button>
				</div>
			) : null}
		</div>
	);
};

export default CommunityItem;
