import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';

const Home = () => {
	return (
		<div className='py-10 space-y-10'>
			<CreatePost />
			<Post />
			<Post />
			<Post />
			<Post />
		</div>
	);
};

export default Home;
