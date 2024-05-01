import ContentLoader from 'react-content-loader';

const NavPlaceholder = () => {
	return (
		<div className='absolute top-0 left-0 right-0 w-full h-[4.75rem] grid items-center dark:bg-dark-hover z-10 dark:shadow-nav px-10'>
			<div className='flex justify-between items-center'>
				<ContentLoader
					speed={2}
					width={400}
					height={160}
					viewBox='0 0 400 160'
					backgroundColor='#495565'
					foregroundColor='#B9C0CB'
				>
					<rect x='79' y='18' rx='6' ry='6' width='260' height='40' />
					<circle cx='27' cy='38' r='25' />
				</ContentLoader>
				<ContentLoader
					speed={2}
					width={400}
					height={160}
					viewBox='0 0 400 160'
					backgroundColor='#495565'
					foregroundColor='#B9C0CB'
				>
					<circle cx='20' cy='38' r='18' />
					<circle cx='65' cy='38' r='18' />
					<circle cx='110' cy='38' r='18' />
					<circle cx='200' cy='38' r='22' />
					<rect x='230' y='18' rx='6' ry='6' width='168' height='40' />
				</ContentLoader>
			</div>
		</div>
	);
};

export default NavPlaceholder;
