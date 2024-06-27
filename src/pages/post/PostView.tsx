import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router-dom';
import Post from '../../components/Post';
import RootLoader from '../../components/ui-placeholders/RootLoader';
import { useGetPostQuery } from '../../features/post/postApi';

const PostView = () => {
	const params = useParams();
	const { data, isLoading, isSuccess, isError } = useGetPostQuery(
		params?.postId || skipToken
	);

	if (isLoading) return <RootLoader />;
	if (isError)
		return <h1 className='title text-red text-2xl'>Something is wrong</h1>;

	return (
		isSuccess && (
			<div className='mb-5 max-w-102 mx-auto'>
				<Post post={data} />
			</div>
		)
	);
};

export default PostView;
