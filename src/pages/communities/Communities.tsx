// import { Navigation, Pagination } from 'swiper/modules';
// import { Swiper } from 'swiper/react';
import { useState } from 'react';
import CommunityItem from './partials/CommunityItem';

import data from '../../../data.json';

const slicedData = data.slice(10, 20);

const Communities = () => {
	const [updatedOptionId, setUpdatedOptionId] = useState('');

	const handleOption = (id: string) => {
		setUpdatedOptionId(id);
	};

	const handleClose = () => {
		setUpdatedOptionId('');
	};

	return (
		<div className='py-5 h-screen space-y-8'>
			{/* // TODO: customize it */}
			{/* <FavCommunities /> */}
			<div className='py-5 space-y-5'>
				<h1 className='title text-2xl'>Your Communities</h1>
				{slicedData.map(({ id, createdAt, name }) => (
					<CommunityItem
						key={id}
						id={id}
						// avatar={avatar}
						bio={name}
						name={name}
						createdAt={createdAt}
						updatedOptionId={updatedOptionId}
						handleClose={handleClose}
						handleOption={handleOption}
					/>
				))}
			</div>
		</div>
	);
};

export default Communities;
