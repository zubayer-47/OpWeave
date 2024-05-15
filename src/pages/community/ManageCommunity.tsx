import { Link, useParams } from 'react-router-dom';

const ManageCommunity = () => {
	const params = useParams();

	console.log(params);
	return (
		<div className='grid grid-cols-3'>
			<div className='col-span-1'>
				<Link to=''>Community Rules</Link>
			</div>
			<div className='col-span-2'>hello</div>
		</div>
	);
};

export default ManageCommunity;
