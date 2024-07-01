import { Share } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import profile from '../../../assets/profile.webp';

const BookmarkItem = () => {
	return (
		<div>
			<LazyLoadImage src={profile} alt='Post Image' effect='blur' />

			<div>
				<h1>How to optimize react app...</h1>
				<div>
					<LazyLoadImage src={profile} alt='Profile picture' effect='blur' />
					<div>
						<button>Save Into</button>
						<Share />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookmarkItem;
