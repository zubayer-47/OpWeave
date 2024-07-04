import clsx from 'clsx';
import React, { isValidElement } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
	scroll?: boolean;
	hasNav?: boolean;
	// children?: ReactNode
}

const CenterLayout = ({
	className,
	scroll,
	hasNav,
	children,
	...rest
}: Props) => {
	// console.log('center layout');
	// TODO:  check what is it for?
	const hasChildren = isValidElement(children);
	// console.log('hasChildren :', hasChildren);

	return (
		<>
			{(!hasChildren || hasNav) && <Nav />}
			<div
				className={clsx(
					'container mx-auto mt-20',
					className
					// scroll &&
					// 	'w-full height_without_nav overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
				)}
				{...rest}
			>
				{hasChildren ? children : <Outlet />}
			</div>
		</>
	);
};

export default CenterLayout;
