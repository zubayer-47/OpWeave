import OutletLayout from '../layouts/OutletLayout';
import CommunityList from './CommunityList';

const CommunitySuggestions = () => {
	return (
		<OutletLayout title='Community Suggestions' className='mx-5'>
			<CommunityList />
			<CommunityList />
			<CommunityList />
			<CommunityList />
			<CommunityList />
			<CommunityList />
			<CommunityList />
			<button className='title dark:text-dark-muted py-2 lg:py-3 w-full relative'>
				<div className='community_suggestions_btn absolute inset-0'></div>
				<span className='text-xs lg:text-base'>See more</span>
			</button>
		</OutletLayout>
	);
};

export default CommunitySuggestions;
