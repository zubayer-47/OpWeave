import axios from 'axios';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Item {
	// Define the properties of your items here
	id: string;
	text: string;
	avatar: string;
	timestamps: string;
	// ... other properties
}

const MyComponent: React.FC = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	const fetchItems = async () => {
		console.log(scrollRef.current);
		setIsLoading(true);
		try {
			const response = await axios.get<Item[]>(
				`https://65218ee4a4199548356d5dc5.mockapi.io/api/v1/notifications?page=${page}&limit=15`
			);
			const newItems = response.data;
			setItems([...items, ...newItems]);
			setHasMore(newItems.length === 15); // Assuming 15 items per page
			setPage(page + 1);
		} catch (error) {
			console.error(error);
			// Handle errors gracefully, e.g., display an error message
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchItems();
	}, []);

	const handleScroll = () => {
		if (scrollRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
			if (scrollTop + clientHeight >= scrollHeight - 100) {
				// Adjust threshold as needed
				fetchItems();
			}
		}
	};

	return (
		<div
			ref={scrollRef}
			onScroll={handleScroll}
			className='overflow-y-auto h-screen'
		>
			<InfiniteScroll
				dataLength={items.length}
				next={fetchItems}
				hasMore={hasMore}
				loader={isLoading ? <h4>Loading...</h4> : null}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
				scrollableTarget={scrollRef.current as ReactNode}
			>
				{items.map((item) => (
					<div key={item.id} className='list'>
						{item.text}
					</div>
				))}
			</InfiniteScroll>
		</div>
	);
};

export default MyComponent;
