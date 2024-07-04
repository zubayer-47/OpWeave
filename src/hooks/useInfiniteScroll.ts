import { useLayoutEffect, useRef, useState } from 'react';

type Props = {
	hasMore: boolean;
	reset?: boolean;
	distance?: number;
};

export default function useInfiniteScroll({
	hasMore,
	reset = false,
	distance = 250,
}: Props) {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const lastElementRef = useRef<HTMLDivElement>(null);
	const [page, setPage] = useState(1);

	if (reset && page !== 1) {
		setPage(1);
	}

	useLayoutEffect(() => {
		const lastElementNode = lastElementRef.current;
		const scrollContainerNode = scrollContainerRef.current;
		if (!scrollContainerNode || !lastElementNode || !hasMore) return;

		// const options = {
		// 	root: scrollContainerNode,
		// 	rootMargin: `0px 0px ${distance}px 0px`,
		// };

		// let previousY: number | undefined;
		// let previousRatio = 0;

		const listener = (entries: IntersectionObserverEntry[]) => {
			// console.log(entries);
			if (entries[0].isIntersecting) {
				console.log('first');
				setPage((prev) => prev + 1);
			}
			// entries.forEach(
			// 	({ isIntersecting, intersectionRatio, boundingClientRect, target }) => {
			// 		console.log({ target, isIntersecting });
			// 		const { y } = boundingClientRect;
			// 		if (
			// 			isIntersecting &&
			// 			intersectionRatio >= previousRatio &&
			// 			(!previousY || y < previousY)
			// 		) {
			// 			setPage((page) => page + 1);
			// 		}
			// 		previousY = y;
			// 		previousRatio = intersectionRatio;
			// 	}
			// );
		};

		const observer = new IntersectionObserver(listener);
		observer.observe(lastElementNode);

		return () => observer.disconnect();
	}, [hasMore, distance]);

	return { page, lastElementRef, scrollContainerRef };
}
