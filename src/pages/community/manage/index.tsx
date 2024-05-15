import undraw_personalization from '../../../assets/undraw_right_places.svg';

const Manage = () => {
	return (
		<div className='flex flex-col gap-20 justify-center items-center'>
			<h1 className='title text-blue-500 text-2xl'>Manage Your Community</h1>
			<img src={undraw_personalization} className='size-72' alt='' />
		</div>
	);
};

export default Manage;
