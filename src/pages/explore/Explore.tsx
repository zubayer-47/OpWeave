import ExploreItem from './partials/ExploreItem';

const Explore = () => {
	return (
		<div className='mt-10'>
			<div className='grid grid-cols-3 gap-3 mx-44'>
				<ExploreItem />
				<ExploreItem />
				<ExploreItem />
			</div>

			<div className='grid grid-cols-3 gap-3 mt-20'>
				<ExploreItem />
				<ExploreItem />
				<ExploreItem />
				<ExploreItem />
				<ExploreItem />
				<ExploreItem />
				<ExploreItem />
				<ExploreItem />
			</div>
		</div>
	);
};

export default Explore;
