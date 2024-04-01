import clsx from 'clsx';
import React, { isValidElement } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
	scroll?: boolean;
	// children?: ReactNode
}

const CenterLayout = ({ className, scroll, children, ...rest }: Props) => {
	const hasChildren = isValidElement(children);
	// console.log('hasChildren :', hasChildren);

	return (
		<>
			{!hasChildren && <Nav />}
			<div
				className={clsx(
					'container mx-auto size-full',
					className,
					scroll && 'w-full h-screen overflow-y-auto scrollbar-none'
				)}
				{...rest}
			>
				{hasChildren ? children : <Outlet />}
			</div>
		</>
	);
};

export default CenterLayout;
