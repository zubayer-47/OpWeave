import { skipToken } from '@reduxjs/toolkit/query';
import { Frown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';
import { useGetCommunityPostsQuery } from '../../features/post/postApi';

const Home = () => {
	const params = useParams();

	const { data } = useGetCommunityPostsQuery(params.id ?? skipToken);

	return (
		<div className='py-10 space-y-10'>
			<CreatePost />

			{!data?.posts.length ? (
				<h1 className='title flex flex-col items-center'>
					{' '}
					<Frown className='text-red size-14' /> No Post Exist
				</h1>
			) : (
				data.posts.map(
					({
						post_id,
						body,
						community: { name },
						member: {
							user: { avatar, fullname, username },
						},
						image_url,
					}) => (
						<Post
							key={post_id}
							avatar={avatar}
							body={body}
							community_name={name}
							fullname={fullname}
							username={username}
							image_url={image_url}
							// El={body}
						/>
					)
				)
			)}
		</div>
	);
};

export default Home;
