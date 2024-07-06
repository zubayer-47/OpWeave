import { Frown } from 'lucide-react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import Button from '../../../components/Buttons/Button';
import CreatePost from '../../../components/CreatePost';
import Post from '../../../components/Post/Post';
import PostPlaceholder from '../../../components/ui-placeholders/PostPlaceholder';
import type {
	FeedResType,
	Post as PostType,
} from '../../../features/post/types';
import CenterLayout from '../../../layouts/CenterLayout';
import { StatusStateType } from '../../community/Community';

type Props = {
	page: number;
	statusState: StatusStateType;
	postsState: FeedResType;
	currentPagePosts: PostType[];
	fetchNext: () => void;
	fetchPrev: () => void;
};

const Timeline: FC<Props> = ({
	page,
	currentPagePosts,
	postsState,
	statusState,
	fetchNext,
	fetchPrev,
}) => {
	const params = useParams();
	const username = useAppSelector((state) => state.auth.user?.username);

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='space-y-10'>
				{username === params.username! ? <CreatePost /> : null}

				{statusState.isLoading && (
					<>
						<PostPlaceholder />
						<PostPlaceholder />
					</>
				)}

				{!currentPagePosts.length ? (
					<h1 className='title flex flex-col items-center'>
						{' '}
						<Frown className='text-red size-14' /> No Post Exist
					</h1>
				) : (
					currentPagePosts.map((post) => (
						<Post post={post} key={post.post_id} />
					))
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
						disabled={!postsState.hasMore}
					/>
				</div>
			</div>
		</CenterLayout>
	);
};

export default Timeline;
