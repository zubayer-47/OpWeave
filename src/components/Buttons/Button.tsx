import { RefreshCw } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

type BtnProp = ButtonHTMLAttributes<HTMLButtonElement> & {
	title: string;
	handler?: () => void;
	type?: 'button' | 'submit';
	transparent?: boolean;
	isDisabled?: boolean;
	isLoading?: boolean;
};

const Button = ({
	title,
	handler,
	type = 'button',
	transparent,
	isDisabled,
	isLoading,
	...props
}: BtnProp) => {
	return (
		<button
			type={type}
			className={`px-4 p-2 rounded-lg outline-none tracking-wide ${
				(isLoading || isDisabled) && 'opacity-60'
			} ${
				transparent
					? 'bg-transparent text-indigo-500 hover:underline'
					: 'bg-indigo-500 text-white'
			}`}
			onClick={handler}
			disabled={isLoading || isDisabled}
			{...props}
		>
			<span className='flex items-center'>
				<span>{title}</span>
				{!isLoading ? null : (
					<RefreshCw className='ml-2 w-5 h-5 stroke-2 text-white animate-spin' />
				)}
			</span>
		</button>
	);
};

export default Button;
