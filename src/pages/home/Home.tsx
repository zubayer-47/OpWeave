import Post from '../../components/Post';

const Home = () => {
	return (
		<div className='grid grid-cols-5'>
			<div className='col-span-3'>
				<Post />
			</div>
		</div>
	);
};

export default Home;
