import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router-dom';
import NotFound from '../../components/errors/NotFound';
import { MemberRole } from '../../features/community/types';
import {
	useGetCurrentUserPendingPostsQuery,
	useGetPendingPostsQuery,
} from '../../features/post/postApi';
import PendingPost from './partials/PendingPost';

const PendingPosts = ({ title }: { title?: string }) => {
	const params = useParams();
	const {
		data: pendingPostsData,
		isSuccess: isPendingPostsSuccess,
		isLoading: isPendingPostsLoading,
	} = useGetPendingPostsQuery(title ? skipToken : params.id!);
	const { data, isSuccess, isLoading } = useGetCurrentUserPendingPostsQuery(
		title ? params.id! : skipToken
	);

	if (isPendingPostsLoading || isLoading)
		return <h1 className='title'>Loading...</h1>;

	if (isPendingPostsSuccess && pendingPostsData?.role === MemberRole.MEMBER) {
		return <NotFound />;
	}

	return (
		<div className='flex flex-col gap-8 w-full justify-center items-center'>
			<div className='mb-10'>
				<h1 className='title text-xl md:text-2xl'>
					{title || 'Pending Posts'}
				</h1>
				<hr className='w-full border border-dark-border' />
			</div>
			{isPendingPostsSuccess &&
				(!pendingPostsData.posts.length ? (
					<h1 className='title text-light-lighter'>No post exist</h1>
				) : (
					pendingPostsData.posts.map((post) => (
						<PendingPost key={post.post_id} post={post} />
					))
				))}

			{isSuccess &&
				(!data.posts.length ? (
					<h1 className='title text-light-lighter'>No post exist</h1>
				) : (
					data.posts.map((post) => (
						<PendingPost key={post.post_id} isOwnPost post={post} />
					))
				))}
		</div>
	);
};

export default PendingPosts;
