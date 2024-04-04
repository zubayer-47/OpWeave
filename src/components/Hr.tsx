import clsx from 'clsx';

const Hr = ({ className }: { className?: string }) => {
	return (
		<hr className={clsx('border-t-2 dark:border-dark-border', className)} />
	);
};

export default Hr;
