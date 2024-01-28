import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';

const Home = () => {
	return (
		<div className=''>
			<div className='col-span-3 py-10 h-screen overflow-y-auto space-y-10 scrollbar-none'>
				<CreatePost />
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</div>
	);
};

export default Home;
