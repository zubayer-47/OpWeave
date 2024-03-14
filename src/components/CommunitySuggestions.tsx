import CommunityList from './CommunityList';

const CommunitySuggestions = () => {
	return (
		<div className='col-span-4 mx-10 my-10 min-h-100 h-fit border dark:border-dark-border rounded-3xl relative overflow-hidden'>
			<div className='absolute community_suggestions inset-0 opacity-70'></div>

			<div className='absolute inset-0 flex flex-col justify-between'>
				<h1 className='title text-xl py-5 px-4'>Suggested Communities</h1>

				<div className='flex flex-col gap-3.5'>
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
				</div>
			</div>
		</div>
	);
};

export default CommunitySuggestions;
