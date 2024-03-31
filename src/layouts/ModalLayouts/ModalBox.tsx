import clsx from 'clsx';
import { FC } from 'react';

interface ModalBoxProps {
	children: React.ReactNode;
	onClose?: () => void;
	classes?: string;
	overlyBg?: string;
}

const ModalBox: FC<ModalBoxProps> = ({
	children,
	onClose,
	classes,
	overlyBg,
}) => {
	return (
		<div className='flex justify-center items-center overflow-y-auto fixed inset-0 outline-none z-30 focus:outline-none mx-5'>
			<button
				type='button'
				onClick={onClose}
				className={` fixed inset-0 ${!overlyBg ? '' : overlyBg}`}
			></button>
			<div className={clsx('relative my-6 mx-auto', classes)}>{children}</div>
		</div>
	);
};
export default ModalBox;
