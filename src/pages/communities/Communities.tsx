// import { Navigation, Pagination } from 'swiper/modules';
// import { Swiper } from 'swiper/react';
import { useState } from 'react';
import CommunityItem from './partials/CommunityItem';

import { Plus } from 'lucide-react';
import data from '../../../data.json';
import Form from '../../components/Forms/Form';
import ModalLayout from '../../layouts/ModalLayouts/ModalLayout';

const slicedData = data.slice(10, 20);

const Communities = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [updatedOptionId, setUpdatedOptionId] = useState('');

	const handleFormSubmit = (data: unknown) => {
		console.log('Form data:', data);
		// Do something with the form data
		setIsModalOpen(false); // Close the modal after submission
	};

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
				<div className='flex justify-between items-center'>
					<h1 className='title text-2xl'>Your Communities</h1>
					<button
						type='button'
						className='community_suggestions rounded-full p-1'
						onClick={() => setIsModalOpen(true)}
					>
						<Plus className='text-light-lighter hover:text-light-primary transition-colors' />
					</button>
				</div>
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

			<ModalLayout isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<Form onSubmit={handleFormSubmit} />
			</ModalLayout>
		</div>
	);
};

export default Communities;
