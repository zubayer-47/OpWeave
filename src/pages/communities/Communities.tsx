// import { Navigation, Pagination } from 'swiper/modules';
// import { Swiper } from 'swiper/react';
import CommunityItem from './partials/CommunityItem';

import { Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CommunityCreationForm from '../../components/Forms/CommunityCreationForm';
import {
	useGetCommunitiesQuery,
	useGetUserAssignedCommunitiesQuery,
} from '../../features/community/communityApi';
import { updateModal } from '../../features/modal/modalSlice';
import ModalLayout from '../../layouts/ModalLayouts/ModalLayout';

const Communities = () => {
	// const [isModalOpen] = useState(false);
	const isVisibleModal = useAppSelector((state) => state.modal.isVisibleModal);
	const { data: userAssignedData, isLoading: userAssignedCommunitiesLoading } =
		useGetUserAssignedCommunitiesQuery();
	const { data } = useGetCommunitiesQuery();
	const dispatch = useAppDispatch();

	if (userAssignedCommunitiesLoading) {
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
					<h1 className='title text-xl md:text-2xl'>Your Communities</h1>
					<button
						type='button'
						className='community_suggestions rounded-full p-1'
						onClick={() => dispatch(updateModal())}
					>
						<Plus className='text-light-lighter hover:text-light-primary transition-colors' />
					</button>
				</div>
				{!userAssignedData?.communities.length ? (
					<h1 className='title text-xs md:text-base'>No community exist</h1>
				) : (
					userAssignedData.communities.map(
						({ community_id, name, bio, avatar }) => (
							<CommunityItem
								key={community_id}
								community_id={community_id}
								avatar={avatar}
								bio={bio}
								name={name}
							/>
						)
					)
				)}
			</div>

			<div className='py-5 space-y-5'>
				<h1 className='title text-xl md:text-2xl'>Suggested Communities</h1>

				{!data?.communities.length ? (
					<h1 className='title text-xs md:text-base'>No community exist</h1>
				) : (
					data.communities.map(({ community_id, name, bio, avatar }) => (
						<CommunityItem
							key={community_id}
							community_id={community_id}
							avatar={avatar}
							bio={bio}
							name={name}
							isSuggested
						/>
					))
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
