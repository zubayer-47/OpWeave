import OutletLayout from '../layouts/OutletLayout';
import CommunityList from './CommunityList';

const CommunitySuggestions = () => {
	return (
		<OutletLayout title='Community Suggestions'>
			<CommunityList />
			<CommunityList />
			<CommunityList />
			<CommunityList />
			<CommunityList />
			<CommunityList />
			<CommunityList />
			<button className='title dark:text-dark-muted py-3 w-full relative'>
				<div className='community_suggestions_btn absolute inset-0'></div>
				See more
			</button>
		</OutletLayout>
	);
};

export default CommunitySuggestions;
