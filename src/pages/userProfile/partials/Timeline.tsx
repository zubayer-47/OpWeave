import Post from '../../../components/Post';
import CenterLayout from '../../../layouts/CenterLayout';

const Timeline = () => {
	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='space-y-10'>
				{new Array(10).fill(true).map(() => (
					<Post />
				))}
			</div>
		</CenterLayout>
	);
};

export default Timeline;
