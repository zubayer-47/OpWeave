import clsx from 'clsx';
import { X } from 'lucide-react';
import { FC, ReactNode } from 'react';
import Hr from '../../components/Hr';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const ModalLayout: FC<Props> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center'>
			<button
				type='button'
				onClick={onClose}
				className='bg-black absolute inset-0 cursor-pointer opacity-50'
			></button>
			<div
				className={clsx(
					'bg-dark-primary rounded-lg shadow-lg p-8',
					'max-w-md w-full',
					'focus:outline-none z-10 relative'
				)}
			>
				<div className='flex justify-between items-center mb-3'>
					<h1 className='title text-xl'>Create Community</h1>

					<button className='inline-block group relative' onClick={onClose}>
						<span className='sr-only'>Close</span>
						<span className='absolute -top-9 scale-0 w-max -right-5 transition-all rounded bg-dark-border shadow-md p-2 text-xs text-white group-hover:scale-100'>
							✨ Close
						</span>
						<X className='hover:bg-rose-500 text-light-primary rounded-md' />
					</button>
				</div>

				<Hr className='mb-3' />

				{children}
			</div>
		</div>
	);
};

export default ModalLayout;
