// import { Navigation, Pagination } from 'swiper/modules';
// import { Swiper } from 'swiper/react';
import { useState } from 'react';
import CommunityItem from './partials/CommunityItem';

import { Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CommunityCreationForm from '../../components/Forms/CommunityCreationForm';
import { useGetUserCommunitiesQuery } from '../../features/community/communityApi';
import { updateModal } from '../../features/modal/modalSlice';
import ModalLayout from '../../layouts/ModalLayouts/ModalLayout';

const Communities = () => {
	// const [isModalOpen] = useState(false);
	const isVisibleModal = useAppSelector((state) => state.modal.isVisibleModal);
	const [updatedOptionId, setUpdatedOptionId] = useState('');
	const { data, isLoading } = useGetUserCommunitiesQuery();
	const dispatch = useAppDispatch();

	// const handleFormSubmit = (data: unknown) => {
	// 	console.log('Form data:', data);
	// 	// Do something with the form data
	// 	setIsModalOpen(false); // Close the modal after submission
	// };

	const handleOption = (id: string) => {
		setUpdatedOptionId(id);
	};

	const handleClose = () => {
		setUpdatedOptionId('');
	};

	if (isLoading) {
		return <h1 className='title text-center'>Loading...</h1>;
	}

	return (
		<div className='py-5 h-screen space-y-8'>
			{/* // TODO: customize it */}
			{/* <FavCommunities /> */}
			{/* <ItemContainer /> */}

			<h1 className='title'>Make it</h1>

			<div className='py-5 space-y-5'>
				<div className='flex justify-between items-center'>
					<h1 className='title text-2xl'>Your Communities</h1>
					<button
						type='button'
						className='community_suggestions rounded-full p-1'
						onClick={() => dispatch(updateModal())}
					>
						<Plus className='text-light-lighter hover:text-light-primary transition-colors' />
					</button>
				</div>
				{!data?.communities.length ? (
					<h1>No community exist</h1>
				) : (
					data.communities.map(
						({ community_id, name, bio, createdAt, avatar }) => (
							<CommunityItem
								key={community_id}
								community_id={community_id}
								avatar={avatar}
								bio={bio}
								name={name}
								createdAt={createdAt}
								updatedOptionId={updatedOptionId}
								handleClose={handleClose}
								handleOption={handleOption}
							/>
						)
					)
				)}
			</div>

			<ModalLayout
				heading='Create Community'
				isOpen={isVisibleModal}
				onClose={() => dispatch(updateModal())}
			>
				<CommunityCreationForm />
			</ModalLayout>
		</div>
	);
};

export default Communities;
