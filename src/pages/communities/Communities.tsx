import TestSwiper from '../../components/TestSwiper';
import CommunityItem from './partials/CommunityItem';

const Communities = () => {
	return (
		<div className='py-5 h-screen space-y-8'>
			{/* <FavCommunities /> */}

			<TestSwiper />

			<div className='py-5 space-y-5'>
				<h1 className='title text-2xl'>Your Communities</h1>
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
				<CommunityItem />F T
			</div>
		</div>
	);
};

export default Communities;
