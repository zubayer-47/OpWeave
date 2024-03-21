import React, { useEffect, useRef, useState } from 'react';
import { Community } from '../pages/communities/partials/FavCommunities';

const API_URL =
	'https://65218ee4a4199548356d5dc5.mockapi.io/api/v1/communities';

const useFetch = (page: number) => {
	const [data, setData] = useState<Community[]>([]);
	const [fetchD, setFetch] = useState(1);

	useEffect(() => {
		const abort = new AbortController();

		(async () => {
			const response = await fetch(`${API_URL}?page=${page}&limit=10`, {
				signal: abort.signal,
			});
			const data = (await response.json()) as Community[];

			console.log({ data });

			setData((prev) => [...prev, ...data]);
		})();

		return () => abort.abort();
	}, [fetchD, page]);

	const fetchData = () => {
		setFetch((prev) => prev + 1);
	};

	return { data, fetchData };
};

const HorizontalScroll: React.FC = () => {
	// const [items, setItems] = useState<Community[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const scrollRef = useRef<HTMLDivElement>(null);

	const { data: items, fetchData } = useFetch(page);

	// useEffect(() => {

	// 		const data = await fetchData(page, abort.signal);
	// 		setItems(data);
	// 		setHasMore(data.length === 10); // Check if there are more items

	// }, []);

	const handleScroll = async () => {
		const scrollElem = scrollRef.current;

		// console.log(scrollElem!.scrollHeight - 20, 'end');
		// console.log(scrollElem!.scrollTop - 105, 'scroll position');
		// console.log(scrollElem!.clientHeight, 'client height');

		if (scrollElem!.scrollTop > scrollElem!.clientHeight - 15) {
			console.log('fetch');
			setPage((prev) => prev + 1);
		}

		// if (scrollElem) {
		// 	const { scrollTop, scrollHeight, clientHeight } = scrollElem;
		// 	if (scrollTop + clientHeight >= scrollHeight - 100) {
		// 		// Load more data when scrolled near the bottom
		// 		setPage(page + 1);
		// 		const newData = await fetchData(page + 1);
		// 		setItems([...items.slice(-5), ...newData]); // Keep last 5 and add new 10
		// 		setHasMore(newData.length === 10);
		// 	}
		// }
	};

	return (
		<div
			ref={scrollRef}
			onScroll={handleScroll}
			// style={{ overflowX: 'scroll' }}
			className='overflow-auto h-[50rem] grid gap-10 bg-rose-400'
		>
			{items.map((item, index) => (
				<div key={index} className='size-32 bg-blue-200 text-gray-800 text-5xl'>
					{item.id}
				</div>
			))}
			{hasMore && <div className='title'>Loading more...</div>}
		</div>
	);
};

export default HorizontalScroll;
