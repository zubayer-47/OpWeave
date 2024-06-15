import { Heart } from 'lucide-react';
import { FC, useState } from 'react';
import { usePostReactMutation } from '../../features/post/postApi';
import classes from './LoveIcon.module.css';

type Props = {
	post_id: string;
};

const LoveIcon: FC<Props> = ({ post_id }) => {
	const [postReact, { data, isSuccess }] = usePostReactMutation();
	const [liked, setLiked] = useState(false);

	const toggleLike = async () => {
		setLiked(!liked);

		try {
			const res = await postReact(post_id).unwrap();

			console.log(res);
		} catch (error) {
			// console.log(error, '--e-');
		}
	};

	return (
		<button
			onClick={toggleLike}
			className={`focus:outline-none ${
				liked ? classes.animateLike : classes.animateUnlike
			}`}
		>
			{liked ? (
				<Heart className='size-8 stroke-rose-500' />
			) : (
				<Heart className='size-8 stroke-rose-500 fill-rose-500' />
			)}
		</button>
	);
};

export default LoveIcon;
