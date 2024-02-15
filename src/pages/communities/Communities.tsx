import CommunityItem from './partials/CommunityItem';

const Communities = () => {
	return (
		<div className='py-5 h-screen overflow-y-auto space-y-10 scrollbar-none'>
			<div className='title text-2xl'>Your Communities</div>
			{/* <div className='mt-10 space-y-5'> */}
			<div className='space-y-6'>
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
