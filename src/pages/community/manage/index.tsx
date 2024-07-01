import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import undraw_personalization from '../../../assets/undraw_right_places.svg';

const Manage = () => {
	return (
		<div className='flex flex-col gap-20 justify-center items-center'>
			<h1 className='title text-blue-500 text-2xl'>Manage Your Community</h1>
			<LazyLoadImage
				src={undraw_personalization}
				className='size-72'
				alt=''
				effect='blur'
			/>
		</div>
	);
};

export default Manage;
