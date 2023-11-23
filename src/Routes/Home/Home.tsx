import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className='flex flex-col bg-background'>
			<nav className='bg-primary p-4'>
				<div className='container mx-auto flex justify-between items-center'>
					<div className='text-white font-bold text-xl'>Company Logo</div>
					<div className='flex space-x-4'>
						<Link to='#'>Dashboard</Link>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Home;
