import { Frown } from 'lucide-react';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import Button from '../../../components/Buttons/Button';
import CreatePost from '../../../components/CreatePost';
import Post from '../../../components/Post/Post';
import PostPlaceholder from '../../../components/ui-placeholders/PostPlaceholder';
import {
	useGetUserPostsQuery,
	useLazyGetUserPostsQuery,
} from '../../../features/post/postApi';
import CenterLayout from '../../../layouts/CenterLayout';

type Props = {
	scrollDivRef: React.RefObject<HTMLDivElement>;
};

const Timeline: FC<Props> = ({ scrollDivRef }) => {
	const params = useParams();
	const username = params.username!;
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetUserPostsQuery({ username });
	const [trigger, result] = useLazyGetUserPostsQuery();

	const hasMore = result.data?.hasMore ?? data?.hasMore;

	const loggedIn_username = useAppSelector(
		(state) => state.auth.user?.username
	);

	const fetchNext = () => {
		if (hasMore) {
			trigger({ username, page: page + 1 }, true);

			setPage((prev) => prev + 1);

			if (scrollDivRef.current) {
				scrollDivRef.current.scrollTop = 0;
			}
		}
	};

	const fetchPrev = () => {
		if (page > 1) {
			trigger({ username, page: page - 1 }, true);

			setPage((prev) => prev - 1);
		}
	};

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='space-y-10'>
				{loggedIn_username === params.username! ? <CreatePost /> : null}

				{hasMore && (isLoading || result.isLoading) && (
					<>
						<PostPlaceholder />
						<PostPlaceholder />
					</>
				)}

				{!data?.posts.length ? (
					<h1 className='title flex flex-col items-center'>
						{' '}
						<Frown className='text-red size-14' /> No Post Exist
					</h1>
				) : (
					data?.posts.map((post) => <Post post={post} key={post.post_id} />)
				)}

				<div className='flex justify-between items-center'>
					<Button
						onClick={fetchPrev}
						text='Prev'
						size='small'
						disabled={page === 1}
					/>
					<Button
						onClick={fetchNext}
						text='Next'
						size='small'
						disabled={!hasMore}
					/>
				</div>
			</div>
		</CenterLayout>
	);
};

export default Timeline;
