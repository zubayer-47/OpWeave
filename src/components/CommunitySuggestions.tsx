import { useNavigate } from 'react-router-dom';
import { useGetCommunitiesQuery } from '../features/community/communityApi';
import OutletLayout from '../layouts/OutletLayout';
import CommunityItem from '../pages/communities/partials/CommunityItem';

const CommunitySuggestions = () => {
	const { data } = useGetCommunitiesQuery({ page: 1, limit: 7 });
	const navigate = useNavigate();

	const handleSeeMore = () => {
		navigate('/communities');
	};

	return (
		<OutletLayout
			title='Community Suggestions'
			className='mx-5'
			childGap='!gap-1'
		>
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
						isSuggestedBox
					/>
				))
			)}

			<button
				type='button'
				onClick={handleSeeMore}
				className='title dark:text-dark-muted py-2 lg:py-3 w-full relative'
			>
				<div className='community_suggestions_btn absolute inset-0'></div>
				<span className='text-xs lg:text-base'>See more</span>
			</button>
		</OutletLayout>
	);
};

export default CommunitySuggestions;
