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
			// className={`px-4 p-2 rounded-lg outline-none tracking-wide ${
			// 	(isLoading || isDisabled) && 'opacity-60'
			// } ${
			// 	transparent
			// 		? 'bg-transparent text-nav-selected hover:underline'
			// 		: 'bg-nav-selected text-light'
			// }`}
			className={`button px-4 py-2 w-fit ${
				(isLoading || isDisabled) && 'opacity-60'
			} ${
				transparent
					? 'bg-transparent text-nav-selected border border-nav-selected hover:bg-nav-selected hover:text-light'
					: 'bg-nav-selected text-light'
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
