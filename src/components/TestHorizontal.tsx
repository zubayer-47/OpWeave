import { useRef, useState } from 'react';

interface Item {
	id: string;
	content: string;
}

const items: Item[] = [
	{ id: '1', content: 'Item 1' },
	{ id: '2', content: 'Item 2' },
	{ id: '3', content: 'Item 3' },
	{ id: '4', content: 'Item 4' },
	{ id: '5', content: 'Item 5' },
	{ id: '6', content: 'Item 6' },
	{ id: '7', content: 'Item 7' },
	{ id: '8', content: 'Item 8' },
	{ id: '9', content: 'Item 9' },
	{ id: '10', content: 'Item 10' },
];

const HorizontalScroll = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState<number>(0);

	const handleScrollLeft = () => {
		if (scrollPosition > 0) {
			const calculatePosition = scrollPosition - 128;

			setScrollPosition(calculatePosition);
		}
	};

	const handleScrollRight = () => {
		const scrollWidth = scrollContainerRef.current!.scrollWidth;
		const containerWidth = scrollContainerRef.current!.offsetWidth;

		console.log('scrollWidth :', scrollWidth);
		console.log('containerWidth :', containerWidth);

		if (scrollPosition < scrollWidth - containerWidth) {
			const calculatePosition = scrollPosition + 128;

			setScrollPosition(calculatePosition);
		}
	};

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
					className='flex gap-10'
					style={{ transform: `translateX(-${scrollPosition}px)` }}
				>
					{items.map((item) => (
						<div
							className='title bg-purple-300 text-dark-primary rounded-lg px-2 py-10 snap-center min-w-32'
							key={item.id}
						>
							{item.content}
						</div>
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
export default HorizontalScroll;
