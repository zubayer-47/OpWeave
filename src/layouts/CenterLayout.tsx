import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
	scroll?: boolean;
}

const CenterLayout = ({ className, scroll, ...rest }: Props) => {
	return (
		<>
			<Nav />
			<div
				className={clsx(
					'container mx-auto w-full h-screen',
					className,
					scroll && 'w-full h-screen overflow-y-auto scrollbar-none'
				)}
				{...rest}
			>
				<Outlet />
			</div>
		</>
	);
};

export default CenterLayout;
