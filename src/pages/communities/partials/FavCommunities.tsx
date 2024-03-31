import { signal } from '@preact/signals-react';
import { useEffect, useRef, useState } from 'react';
import { Community } from '../../../types/custom';
import HorizontalCommunityItem from './HorizontalCommunityItem';

const FavCommunities = () => {
	const track = signal<'prev' | 'next' | ''>('');
	const [communities, setCommunities] = useState<Community[]>([]);
	const [currentPage, setCurrentPage] = useState(2);

	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState<number>(0);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`https://65218ee4a4199548356d5dc5.mockapi.io/api/v1/communities?page=${currentPage}&limit=5`
				);

				const data = (await res.json()) as Community[];

				setCommunities(data);

				// console.log(track.value === 'prev', currentPage !== 0);
				// const scrollWidth = scrollContainerRef.current!.scrollWidth;

				setScrollPosition(0);

				// if (track.value === 'prev' && currentPage !== 0) {
				// 	console.log('scrollWidth :', scrollWidth);
				// 	setScrollPosition(scrollWidth);
				// }
			} catch (error) {
				console.log(error);
			}

			setLoading(false);
		})();
	}, [currentPage, track.value]);

	const handleScrollLeft = () => {
		if (scrollPosition > 0) {
			const calculatePosition = scrollPosition - 200;

			setScrollPosition(calculatePosition);

			if (currentPage > 1) {
				console.log('f');
				track.value = 'prev';
				setCurrentPage((prev) => prev - 1);
			}
		}
	};

	const handleScrollRight = () => {
		const scrollWidth = scrollContainerRef.current!.scrollWidth;
		const containerWidth = scrollContainerRef.current!.offsetWidth;

		if (scrollPosition < scrollWidth - containerWidth) {
			const calculatePosition = scrollPosition + 200;

			if (containerWidth - 100 < calculatePosition) {
				setCurrentPage((prev) => prev + 1);
			}

			setScrollPosition(calculatePosition);
		}
	};

	console.log(track.value);

	return (
		<div className='relative'>
			<button
				className='title absolute top-0 left-2 community_suggestions rounded-full p-2 z-10'
				onClick={handleScrollLeft}
			>
				&laquo;
			</button>
			<div className='relative overflow-x-auto snap-x snap-mandatory scrollbar-none'>
				<div
					ref={scrollContainerRef}
					className='flex gap-8'
					style={{ transform: `translateX(-${scrollPosition}px)` }}
				>
					{communities.map(({ id }) => (
						<HorizontalCommunityItem key={id} name={id} />
					))}
				</div>
			</div>
			<button
				className='title absolute top-0 right-2 community_suggestions rounded-full p-2 z-10'
				onClick={handleScrollRight}
			>
				&raquo;
			</button>
		</div>
	);
};

export default FavCommunities;
