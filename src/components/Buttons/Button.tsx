import clsx from 'clsx';
import { RefreshCw } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

type BtnProp = ButtonHTMLAttributes<HTMLButtonElement> & {
	title: string;
	transparent?: boolean;
	isDisabled?: boolean;
	isLoading?: boolean;
};

const Button = ({
	title,
	transparent,
	isDisabled,
	isLoading,
	className,
	...props
}: BtnProp) => (
	<button
		type='button'
		// className={`px-4 p-2 rounded-lg outline-none tracking-wide ${
		// 	(isLoading || isDisabled) && 'opacity-60'
		// } ${
		// 	transparent
		// 		? 'bg-transparent text-nav-selected hover:underline'
		// 		: 'bg-nav-selected text-light-text'
		// }`}
		className={clsx(
			'button px-4 py-2 w-fit',
			(isLoading || isDisabled) && 'opacity-60',
			transparent
				? 'bg-transparent text-light-primary border dark:border-dark-border hover:bg-transparent'
				: 'bg-nav-selected text-light-text',
			className
		)}
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

export default Button;
