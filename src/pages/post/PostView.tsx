import { skipToken } from '@reduxjs/toolkit/query';
import { useLocation } from 'react-router-dom';
import Post from '../../components/Post';
import { useGetPostQuery } from '../../features/post/postApi';

const PostView = () => {
	const { state } = useLocation();
	const { data, isLoading, isSuccess } = useGetPostQuery(
		{ community_id: state.community_id, post_id: state.post_id } || skipToken
	);

	if (isLoading) return <h1 className='title'>Loading</h1>;

	return (
		isSuccess && (
			<div className='mb-5 px-20'>
				<Post post={data} />
			</div>
		)
	);
};

export default PostView;
