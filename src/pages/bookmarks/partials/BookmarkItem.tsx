import { Share } from 'lucide-react';
import profile from '../../../assets/profile.webp';

const BookmarkItem = () => {
	return (
		<div>
			<img src={profile} alt='Post Image' />

			<div>
				<h1>How to optimize react app...</h1>
				<div>
					<img src={profile} alt='Profile picture' />

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
