import CommunityItem from './partials/CommunityItem';
import FavCommunities from './partials/FavCommunities';

const Communities = () => {
	return (
		<div className='py-5 h-screen space-y-8'>
			<FavCommunities />

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
				<CommunityItem />F
			</div>
		</div>
	);
};

export default Communities;
