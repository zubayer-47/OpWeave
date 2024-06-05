import {
	Bookmark,
	Heart,
	MessageCircle,
	MessageSquareShare,
} from 'lucide-react';
import ContentLoader from 'react-content-loader';

const PostPlaceholder = () => {
	return (
		<div className='post px-7 pt-5 pb-3 relative'>
			<div className='flex justify-between w-full'>
				<ContentLoader
					speed={2}
					backgroundColor='#495565'
					foregroundColor='#B9C0CB'
					className='w-[232px] h-[50px]'
				>
					<rect x='50' y='10' rx='6' ry='6' width='150' height='15' />
					<rect x='50' y='34' rx='6' ry='6' width='100' height='15' />
					<circle cx='20' cy='30' r='20' />
				</ContentLoader>
				<ContentLoader
					speed={2}
					backgroundColor='#495565'
					foregroundColor='#B9C0CB'
					className='h-[50px] w-[165px]'
				>
					<rect x='40' y='7' rx='6' ry='6' width='120' height='20' />
					<rect x='1' y='3' rx='6' ry='6' width='30' height='30' />
				</ContentLoader>
			</div>

			<div className='mt-5'>
				<ContentLoader
					speed={2}
					width={300}
					height={30}
					viewBox='0 0 300 30'
					backgroundColor='#495565'
					foregroundColor='#B9C0CB'
				>
					<rect y='7' rx='6' ry='6' width='290' height='15' />
				</ContentLoader>
			</div>

			<ContentLoader
				speed={2}
				backgroundColor='#495565'
				foregroundColor='#B9C0CB'
				className='w-full h-80'
			>
				<rect rx='6' ry='6' className='w-full h-full' />
			</ContentLoader>
			<div className='flex items-center justify-between mt-5'>
				<div className='flex items-center gap-3'>
					<Heart className='size-8 text-light-muted dark:text-dark-muted' />
					<MessageCircle className='size-8 text-light-muted dark:text-dark-muted' />
					<MessageSquareShare className='size-7 text-light-muted dark:text-dark-muted' />
				</div>
				<Bookmark className='size-8 text-light-muted dark:text-dark-muted' />
			</div>
		</div>
	);
};

export default PostPlaceholder;
