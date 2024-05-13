import CreatePost from '../../../components/CreatePost';
import Post from '../../../components/Post';
import CenterLayout from '../../../layouts/CenterLayout';

const Timeline = () => {
	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='space-y-10'>
				<CreatePost />

				{new Array(10).fill(true).map((_, ind) => (
					<Post
						avatar=''
						body=''
						community_name=''
						fullname=''
						image_url=''
						username=''
						key={ind}
					/>
				))}
			</div>
		</CenterLayout>
	);
};

export default Timeline;
