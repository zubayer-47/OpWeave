import CommunityList from './CommunityList';

const CommunitySuggestions = () => {
	return (
		<div className='col-span-4 my-10 py-3 h-3/5 bg-dark-secondary border dark:border-dark-border rounded-3xl flex flex-col relative overflow-hidden'>
			<h1 className='title text-2xl px-4'>Suggested Communities</h1>

			<div className='flex flex-col gap-0 mt-5'>
				<CommunityList />
				<CommunityList />
				<CommunityList />
				<CommunityList />
				<CommunityList />
				<CommunityList />
				<button className='title hover:bg-[#162033] dark:text-dark-muted py-4 absolute bottom-0 left-0 right-0 w-full '>
					See more
				</button>
			</div>
		</div>
	);
};

export default CommunitySuggestions;
