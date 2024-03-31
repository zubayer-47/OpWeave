import { Bell, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile from '../../../assets/profile.webp';
import HorizontalMore from '../../../components/Buttons/HorizontalMore';
import Hr from '../../../components/Hr';

type Props = {
	id: string;
	action: boolean;
	updatedOptionId: string;
	handleOption: (id: string) => void;
	handleClose: () => void;
};

export const NotificationItem = ({
	id,
	action,
	updatedOptionId,
	handleOption,
	handleClose,
}: Props) => {
	return (
		<div className='dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all p-5 flex justify-between items-center rounded-2xl relative'>
			<div className='flex justify-center gap-5'>
				<Link to='/'>
					<img
						className='profile'
						src={profile}
						alt="A B M Zubayer's profile"
					/>
				</Link>
				<div className='flex flex-col'>
					<Link to='/' className='title'>
						A B M Zubayer
					</Link>
					<span className='title font-normal text-sm text-dark-muted'>
						3s ago
					</span>

					{!action ? null : (
						<div className='flex items-center gap-3 mt-3'>
							<button className='button text-light-text text-sm py-1.5 px-3'>
								Accept
							</button>
							<button className='button-decline'>Decline</button>
						</div>
					)}
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
					<Hr />
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

// export const NotificationActionableItem = ({ id }: Props) => {
// 	return (
// 		<div className='dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all p-5 flex justify-between items-center rounded-2xl'>
// 			<div className='flex justify-center gap-5'>
// 				<Link to='/'>
// 					<img
// 						className='profile'
// 						src={profile}
// 						alt="A B M Zubayer's profile"
// 					/>
// 				</Link>
// 				<div className='flex flex-col'>
// 					<Link to='/' className='title'>
// 						A B M Zubayer
// 					</Link>
// 					<span className='title font-normal text-sm text-dark-muted'>
// 						3s ago
// 					</span>

// 					<div className='flex items-center gap-3 mt-3'>
// 						<button className='button text-light-text text-sm py-1.5 px-3'>
// 							Accept
// 						</button>
// 						<button className='button-decline'>Decline</button>
// 					</div>
// 				</div>
// 			</div>

// 			<HorizontalMore />
// 		</div>
// 	);
// };
