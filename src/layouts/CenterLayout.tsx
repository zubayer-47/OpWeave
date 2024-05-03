import clsx from 'clsx';
import React, { isValidElement } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
	scroll?: boolean;
	// children?: ReactNode
}

const CenterLayout = ({ className, scroll, children, ...rest }: Props) => {
	console.log('center layout');
	const hasChildren = isValidElement(children);
	// console.log('hasChildren :', hasChildren);

	return (
		<>
			{!hasChildren && <Nav />}
			<div
				className={clsx(
					'container mx-auto mt-[4.76rem]',
					className,
					scroll &&
						'w-full height_without_nav overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
				)}
				{...rest}
			>
				{hasChildren ? children : <Outlet />}
			</div>
		</>
	);
};

export default CenterLayout;
