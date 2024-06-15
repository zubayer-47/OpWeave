import { Heart } from 'lucide-react';
import { FC, useState } from 'react';
import { usePostReactMutation } from '../../features/post/postApi';
import classes from './LoveIcon.module.css';

type Props = {
	post_id: string;
	react: 'LIKE' | 'UNLIKE';
	community_id: string;
};

const LoveIcon: FC<Props> = ({ post_id, react, community_id }) => {
	const [postReact] = usePostReactMutation();
	const [liked, setLiked] = useState(react === 'LIKE');

	const toggleLike = async () => {
		setLiked(!liked);
		postReact({ post_id, community_id });
	};

	return (
		<button
			onClick={toggleLike}
			className={`focus:outline-none ${
				liked ? classes.animateLike : classes.animateUnlike
			}`}
		>
			{liked ? (
				<Heart className='size-8 stroke-rose-500 fill-rose-500' />
			) : (
				<Heart className='size-8 stroke-rose-500' />
			)}
		</button>
	);
};

export default LoveIcon;
