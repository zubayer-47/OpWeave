import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router-dom';
import NotFound from '../../components/errors/NotFound';
import { MemberRole } from '../../features/community/types';
import { useGetPendingPostsQuery } from '../../features/post/postApi';
import PendingPost from './partials/PendingPost';

const PendingPosts = () => {
	const params = useParams();
	const { data, isSuccess, isLoading } = useGetPendingPostsQuery(
		params.id || skipToken
	);

	if (isLoading) return <h1 className='title'>Loading...</h1>;

	if (isSuccess && data.role === MemberRole.MEMBER) {
		return <NotFound />;
	}

	return (
		<div className='flex flex-col gap-8 w-full justify-center items-center'>
			<div className='mb-10'>
				<h1 className='title text-2xl'>Pending Posts</h1>
				<hr className='w-full border border-dark-border' />
			</div>
			{isSuccess &&
				(!data.posts.length ? (
					<h1 className='title text-light-lighter'>No post exist</h1>
				) : (
					data.posts.map((post) => (
						<PendingPost key={post.post_id} post={post} />
					))
				))}
		</div>
	);
};

export default PendingPosts;
