import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import CommunityItem from './CommunityItem';

const FavCommunities = () => {
	const [currentPage, setCurrentPage] = useState(0);

	return (
		<div className='space-y-5 relative'>
			<h1 className='title text-2xl'>Favorite Communities</h1>

			<div className='snap-x relative'>
				<button
					type='button'
					className='absolute left-10 -translate-x-full translate-y-full'
				>
					<ChevronLeft className='text-light-lighter size-10' />
				</button>
				<div className='flex justify-start items-stretch gap-8 overflow-x-auto snap-x'>
					<CommunityItem />
					<CommunityItem />
					<CommunityItem />
					<CommunityItem />
					<CommunityItem />
					<CommunityItem />
				</div>
				<button
					type='button'
					className='absolute right-10 translate-x-full -translate-y-full'
				>
					<ChevronRight className='text-light-lighter size-10' />
				</button>
			</div>
		</div>
	);
};

export default FavCommunities;

/**
 * <div className='space-y-5 relative'>
			<h1 className='title text-2xl'>Favorite Communities</h1>

			<div className='flex justify-between items-center gap-1 snap-x'>
				<button type='button'>
					<ChevronLeft className='text-light-lighter size-10' />
				</button>

				<div className='flex justify-start items-stretch gap-8 overflow-x-auto snap-x'>
					<CommunityItem />
					<CommunityItem />
					<CommunityItem />
					<CommunityItem />
					<CommunityItem />
					<CommunityItem />
				</div>
				<button type='button'>
					<ChevronRight className='text-light-lighter size-10' />
				</button>
			</div>
		</div>
 * 
 */
