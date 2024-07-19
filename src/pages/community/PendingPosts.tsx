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
		<div className='h-screen py-5 overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'>
			<div className='max-w-100 mx-auto px-2 flex flex-col gap-8'>
				<div className='flex  flex-col justify-center items-center'>
					<h1 className='title text-xl md:text-2xl'>
						{title || 'Pending Posts'}
					</h1>
					<hr className='w-2/4 border border-dark-border' />
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
		</div>
	);
};

export default PendingPosts;
