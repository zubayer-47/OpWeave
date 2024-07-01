import clsx from 'clsx';
import { Bell, Compass } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import profile from '../../../assets/profile.webp';
import Button from '../../../components/Buttons/Button';
import HorizontalMore from '../../../components/Buttons/HorizontalMore';
import Hr from '../../../components/Hr';

type Props = {
	id: string;
	action?: boolean; // Make action optional
	updatedOptionId?: string; // Make updatedOptionId optional
	handleOption: (id: string) => void; // Make handleOption optional
	handleClose?: () => void; // Make handleClose optional
	className?: string; // Add className prop for custom styling
};

export const NotificationItem = ({
	id,
	action = false, // Set default value for action
	updatedOptionId,
	handleOption,
	handleClose,
	className,
}: Props) => {
	// Base class for the component
	const baseClass =
		'dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all p-5 flex justify-between items-center rounded-2xl relative';

	return (
		<div className={clsx(baseClass, className)}>
			<div className='flex justify-center gap-5'>
				<Link to='/'>
					<LazyLoadImage
						className='profile'
						src={profile}
						alt='notification item image'
						effect='blur'
					/>
				</Link>
				<div className='flex flex-col'>
					<Link to='/' className='title'>
						A B M Zubayer
					</Link>
					<span className='title font-normal text-sm text-dark-muted'>
						3s ago
					</span>

					{action && ( // Conditionally render action buttons
						<div className='flex items-center gap-3 mt-3'>
							<Button text='Accept' size='small' className='!py-1.5' />
							<Button
								text='Decline'
								variant='secondary'
								size='small'
								className='!py-1.5'
							/>
						</div>
					)}
				</div>
			</div>

			<HorizontalMore onClick={() => handleOption(id)} onBlur={handleClose} />

			{updatedOptionId === id && ( // Conditionally render options menu
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
			)}
		</div>
	);
};
