import profile from '../../../assets/profile2.jpg';

const ExploreItem = () => {
	return (
		<div className='relative rounded-md overflow-hidden'>
			<img className='w-full h-64 object-cover' src={profile} alt='' />
			<div className='absolute bottom-0 left-0 right-0 bg-dark-primary/50 p-3'>
				<h3 className='title text-xl'>Here is a title</h3>
				<div className='flex items-center gap-2'>
					<img src={profile} className='profile' alt='' />
					<span className='title text-sm font-normal font-DM-Sans'>
						@zubayerjs
					</span>
				</div>
			</div>
		</div>
	);
};

export default ExploreItem;
