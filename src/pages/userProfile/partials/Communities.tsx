import { useState } from 'react';
import data from '../../../../data.json';
import CenterLayout from '../../../layouts/CenterLayout';
import CommunityItem from '../../communities/partials/CommunityItem';

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
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='py-5 space-y-5'>
				<h1 className='title text-2xl'>Communities you're in</h1>
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
		</CenterLayout>
	);
};

export default Communities;
