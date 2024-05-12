// // Dependencies
// import clsx from 'clsx';
// import { useEffect, useRef, useState } from 'react';

interface Item {
	id: number;
	title: string;
	// Add other item properties as needed
}

const items: Item[] = [
	{ id: 1, title: 'Item 1' },
	{ id: 2, title: 'Item 2' },
	{ id: 3, title: 'Item 3' },
	{ id: 4, title: 'Item 4' },
	{ id: 5, title: 'Item 5' },
	{ id: 6, title: 'Item 6' },
	{ id: 7, title: 'Item 7' },
	{ id: 8, title: 'Item 8' },
	{ id: 9, title: 'Item 9' },
	{ id: 10, title: 'Item 10' },
	{ id: 11, title: 'Item 11' },
	{ id: 12, title: 'Item 12' },
	{ id: 13, title: 'Item 13' },
	{ id: 14, title: 'Item 14' },
	{ id: 15, title: 'Item 15' },
	{ id: 16, title: 'Item 16' },
	{ id: 17, title: 'Item 17' },
	{ id: 18, title: 'Item 18' },
	{ id: 19, title: 'Item 19' },
	{ id: 20, title: 'Item 20' },
	{ id: 21, title: 'Item 21' },
	{ id: 22, title: 'Item 22' },
	{ id: 23, title: 'Item 23' },
	{ id: 24, title: 'Item 24' },
	{ id: 25, title: 'Item 25' },
	{ id: 26, title: 'Item 26' },
	{ id: 27, title: 'Item 27' },
	{ id: 28, title: 'Item 28' },
	// ... more items
];

// Dependencies
import { useEffect, useRef, useState } from 'react';

// ... (Item interface and items array remain the same)

const ItemContainer = () => {
	const [itemsToDisplay, setItemsToDisplay] = useState<Item[]>([]);
	const [startIndex, setStartIndex] = useState(0);
	const itemsPerScroll = 15;
	const containerRef = useRef<HTMLDivElement>(null);

	const fetchItems = (start: number, end: number) => {
		// Simulate fetching items from an API
		// console.log('rendering');
		const newItems = items.slice(start, end);

		// console.log({ itemsToDisplay });

		setItemsToDisplay((prevItems) => [...prevItems, ...newItems]);
	};

	useEffect(() => {
		fetchItems(startIndex, startIndex + itemsPerScroll);
	}, []);

	const handleScroll = () => {
		if (containerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

			console.log('first:', scrollLeft + clientWidth >= scrollWidth - 100);
			if (scrollLeft + clientWidth >= scrollWidth - 100) {
				console.log('first true');
				// Fetch more items when nearing the end
				const newStartIndex = startIndex + itemsPerScroll;
				fetchItems(newStartIndex, newStartIndex + itemsPerScroll);
				setStartIndex(newStartIndex);
			}

			console.log('second :', scrollLeft <= 100 && startIndex > 0);
			if (scrollLeft <= 100 && startIndex > 0) {
				console.log('second true');
				// Fetch previous items when nearing the beginning
				const newStartIndex = Math.max(0, startIndex - itemsPerScroll);
				const newItems = items.slice(newStartIndex, startIndex);
				setItemsToDisplay((prevItems) => [...newItems, ...prevItems]);
				setStartIndex(newStartIndex);
				containerRef.current.scrollLeft += newItems.length * 100; // Adjust scroll position
			}
		}
	};

	return (
		<div
			ref={containerRef}
			onScroll={handleScroll}
			className='overflow-x-auto flex space-x-4'
		>
			{itemsToDisplay.map((item) => (
				<div
					key={Date.now() * Date.UTC(2000)}
					className='inline-block p-4 bg-gray-200 rounded-lg'
				>
					{item.title}
				</div>
			))}
		</div>
	);
};

export default ItemContainer;

// const ItemContainer = () => {
// 	const [itemsToDisplay, setItemsToDisplay] = useState<Item[]>([]);
// 	const [hasMore, setHasMore] = useState(true);
// 	const itemsPerPage = 10; // Adjust as needed
// 	const observerRef = useRef<IntersectionObserver | null>(null);

// 	useEffect(() => {
// 		// Initial data fetch
// 		setItemsToDisplay(items.slice(0, itemsPerPage));
// 	}, []);

// 	useEffect(() => {
// 		const observer = new IntersectionObserver(
// 			(entries) => {
// 				if (entries[0].isIntersecting && hasMore) {
// 					const nextItems = items.slice(
// 						itemsToDisplay.length,
// 						itemsToDisplay.length + itemsPerPage
// 					);
// 					console.log('first');
// 					setItemsToDisplay((prevItems) => [
// 						...prevItems.slice(-5),
// 						...nextItems,
// 					]);
// 					setHasMore(items.length > itemsToDisplay.length + itemsPerPage);
// 				}
// 			},
// 			{ root: null, rootMargin: '200px' }
// 		);

// 		if (observerRef.current) observerRef.current.disconnect();
// 		observerRef.current = observer;
// 		const elem = document.querySelector('.last-item') as Element;

// 		if (itemsToDisplay.length > 0) {
// 			observer.observe(elem);
// 		}

// 		return () => {
// 			if (observerRef.current) observerRef.current.disconnect();
// 		};
// 	}, [itemsToDisplay, hasMore]);

// 	return (
// 		<div className='relative overflow-x-auto'>
// 			<div className='flex space-x-4'>
// 				{itemsToDisplay.map((item, index) => (
// 					<div
// 						key={item.id}
// 						className={clsx(
// 							'inline-block p-4 bg-gray-200 rounded-lg',
// 							index === itemsToDisplay.length - 1 && 'last-item' // Add ID to last item
// 						)}
// 					>
// 						{item.title}
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default ItemContainer;
