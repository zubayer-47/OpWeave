// import { Navigation, Pagination } from 'swiper/modules';
// import { Swiper } from 'swiper/react';
import { useState } from 'react';
import CommunityItem from './partials/CommunityItem';
import FavCommunities from './partials/FavCommunities';

const Communities = () => {
	const [id, setId] = useState('');

	const select = (id: string) => {
		setId(id);
	};

	return (
		<div className='py-5 h-screen space-y-8'>
			{/* // TODO: customize it */}
			<FavCommunities />
			<div className='py-5 space-y-5'>
				<h1 className='title text-2xl'>Your Communities</h1>
				{new Array(10).fill(undefined).map(() => (
					<CommunityItem />
				))}
			</div>
		</div>
	);
};

export default Communities;
