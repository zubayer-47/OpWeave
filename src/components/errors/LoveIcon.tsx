import clsx from 'clsx';
import { Heart } from 'lucide-react';
import { FC, useState } from 'react';
import { usePostReactMutation } from '../../features/post/postApi';

type Props = {
	post_id: string;
	react: 'LIKE' | 'UNLIKE';
	like_count: number;
	community_id: string;
};

const LoveIcon: FC<Props> = ({ post_id, react, like_count, community_id }) => {
	const [postReact] = usePostReactMutation();
	const [hasLiked, setHasLiked] = useState(react === 'LIKE');
	const [likeCount, setLikeCount] = useState(like_count || 0);

	const toggleLike = async () => {
		setHasLiked(!hasLiked);
		setLikeCount((prev) => {
			return hasLiked ? prev - 1 : prev + 1;
		});

		try {
			await postReact({ post_id, community_id }).unwrap();
		} catch (error) {
			setHasLiked(hasLiked);
			setLikeCount(likeCount);
		}
	};

	return (
		<button
			onClick={toggleLike}
			className={clsx(
				'focus:outline-none bg-dark-border rounded-full flex items-center gap-2 px-3 py-1',
				{
					'bg-red/30': hasLiked,
				}
			)}
		>
			{hasLiked ? (
				<Heart className='size-6 stroke-rose-500 fill-rose-500' />
			) : (
				<Heart className='size-6 stroke-dark-muted' />
			)}

			{!likeCount ? null : (
				<span
					className={clsx('title text-rose-500', {
						'!text-dark-muted': !hasLiked,
					})}
				>
					{likeCount}
				</span>
			)}
		</button>
	);
};

export default LoveIcon;
