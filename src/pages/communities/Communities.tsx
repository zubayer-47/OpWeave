import CommunityItem from './partials/CommunityItem';

const Communities = () => {
	return (
		<div className='py-5 h-screen'>
			<h1 className='title text-2xl'>Communities</h1>
			{/* <div className='mt-10 space-y-5'> */}
			<div className='py-5 space-y-5'>
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
			</div>
		</div>
	);
};

export default Communities;
