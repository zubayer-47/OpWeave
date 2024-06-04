import clsx from 'clsx';
import { RefreshCw } from 'lucide-react';

type ButtonProps = {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'primary' | 'secondary' | 'outline' | 'transparent';
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	icon?: React.ReactNode;
	size?: 'small' | 'medium' | 'large';
	fullWidth?: boolean;
	isLoading?: boolean; // Added isLoading prop
};

const Button: React.FC<ButtonProps> = ({
	text,
	type = 'button',
	variant = 'primary',
	onClick,
	disabled,
	className,
	icon,
	size = 'medium',
	fullWidth,
	isLoading = false, // Default to false
}) => {
	const baseClasses =
		'inline-flex items-center justify-center rounded-md font-Poppins font-medium focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-primary/70 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary';
	const variantClasses = {
		primary: 'bg-blue-primary/80 text-light-primary hover:bg-blue-primary/60',
		outline:
			'border border-dark-border text-light-primary hover:bg-blue-primary/80 hover:border-blue-primary/80',
		secondary: 'button-decline',
		transparent:
			'bg-transparent text-light-primary border dark:border-dark-border hover:bg-transparent',
	};

	const sizeClasses = {
		small: 'px-2.5 py-1.5 text-sm',
		medium: 'px-3.5 py-2 text-base',
		large: 'px-5.5 py-3 text-lg',
	};

	const classes = clsx(
		baseClasses,
		variantClasses[variant],
		sizeClasses[size],
		'w-fit',
		{
			'opacity-50 cursor-not-allowed': disabled || isLoading, // Disable button when loading
			'w-full': fullWidth,
		},
		'transition-colors',
		className
	);

	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
			disabled={disabled || isLoading}
		>
			{icon && <span className='mr-2'>{icon}</span>}
			<span>{text}</span>
			{isLoading ? (
				<span className='flex items-center'>
					<RefreshCw className='ml-2 w-5 h-5 stroke-2 text-white animate-spin' />
					{/* You can add a loading spinner here if needed */}
				</span>
			) : null}
		</button>
	);
};

export default Button;
