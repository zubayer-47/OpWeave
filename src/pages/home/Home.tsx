import CommunityList from '../../components/CommunityList';
import Post from '../../components/Post';

const Home = () => {
	return (
		<div className='grid grid-cols-6 gap-2'>
			<div className='col-span-3 py-10 h-screen overflow-y-auto space-y-10 scrollbar-none'>
				<Post />
				<Post />
				<Post />
				<Post />
			</div>

			<div className='col-span-3 ml-36 my-10 py-3 h-3/5 bg-nav-selected border dark:border-dark-border rounded-lg flex flex-col relative overflow-hidden'>
				<h1 className='title px-4'>Suggested Communities</h1>

				<div className='flex flex-col gap-0 mt-7'>
					<CommunityList />
					<CommunityList />
					<CommunityList />
					<CommunityList />
					<CommunityList />
					<CommunityList />
					<CommunityList />
					<button className='title hover:bg-[#162033] text-lg dark:text-dark-muted py-4 absolute bottom-0 left-0 right-0 w-full '>
						See more
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
