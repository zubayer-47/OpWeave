import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HorizontalMore from '../../../components/Buttons/HorizontalMore';
const THRESHOLD = 15;

interface Notification {
	id: string | number;
	text: string;
	avatar: string;
	timestamps: string;
}

type Props = {
	list: Notification[];
};

const PartialNotifications = ({ list }: Props) => {
	// const [start, setStart] = useState(0);
	// const [end, setEnd] = useState(THRESHOLD);

	const [state, setState] = useState({
		start: 0,
		end: THRESHOLD,
	});

	const topElement = useRef<HTMLDivElement | null>(null);
	const bottomElement = useRef<HTMLDivElement | null>(null);
	const observerRef = useRef<IntersectionObserver>();
	const prevStateRef = useRef(state);

	useEffect(() => {
		initiateScrollObserver();
	}, []);

	useEffect(() => {
		const prevState = prevStateRef.current;

		if (prevState.end !== state.end || prevState.start !== state.start) {
			initiateScrollObserver();
		}
	}, [state.end, state.start]);

	const updateState = useCallback(
		(newStart: number, newEnd: number) => {
			const { start, end } = state;

			if (start !== newStart || end !== newEnd) {
				resetObservation();

				setState((prev) => {
					prevStateRef.current = prev;

					return {
						start: newStart,
						end: newEnd,
					};
				});
			}
		},
		[state]
	);

	const callback = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				const listLength = list.length;
				const { start, end } = state;
				// Scroll Down
				// We make increments and decrements in 10s
				if (entry.isIntersecting && entry.target.id === 'bottom') {
					// console.log('end :', end);
					const maxStartIndex = listLength - 1 - THRESHOLD; // Maximum index value `start` can take
					// console.log('maxStartIndex :', maxStartIndex);
					const maxEndIndex = listLength; // Maximum index value `end` can take
					// console.log('maxEndIndex :', maxEndIndex);
					const newEnd = end + 10 <= maxEndIndex ? end + 10 : maxEndIndex;
					const newStart = end - 5 <= maxStartIndex ? end - 5 : maxStartIndex;

					// console.log({ newStart, newEnd });
					updateState(newStart, newEnd);
				}
				// Scroll up
				if (entry.isIntersecting && entry.target.id === 'top') {
					const newEnd =
						end === THRESHOLD
							? THRESHOLD
							: end - 10 > THRESHOLD
							? end - 10
							: THRESHOLD;
					const newStart = start === 0 ? 0 : start - 10 > 0 ? start - 10 : 0;
					updateState(newStart, newEnd);
				}
			});
		},
		[state, list.length, updateState]
	);

	const initiateScrollObserver = useCallback(() => {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1,
		};

		observerRef.current = new IntersectionObserver(callback, options);

		if (topElement.current) {
			observerRef.current.observe(topElement.current);
			// console.log(topElement.current, 'top');
		}
		if (bottomElement.current) {
			// console.log(bottomElement.current, 'bottom');
			observerRef.current.observe(bottomElement.current);
		}
	}, [callback]);

	/**
	 *
	 * * I have to know the length count of list;
	 */

	const resetObservation = () => {
		if (!observerRef.current || !bottomElement.current || !topElement.current)
			return;

		observerRef.current.unobserve(bottomElement.current);
		observerRef.current.unobserve(topElement.current);

		topElement.current = null;
		bottomElement.current = null;
	};

	const getReference = (index: number, isLastIndex: boolean) => {
		if (index === 0) return topElement;
		if (isLastIndex) return bottomElement;
		return null;
	};

	const updatedList = useMemo(
		() => list.slice(state.start, state.end),
		[state, list]
	);

	/**
	 * times: start , end
	 * 1st: 	0 	,  15
	 * 2nd: 	10 	,  25 	// gap -> 15
	 * 3nd: 	20 	,  35 	// gap -> 15
	 * 4nd: 	28 	,  44 	// because of 30 is greater than 28 and 28 + 15 = 43 and in this case we could have more than 15 in last page
	 */

	const lastIndex = updatedList.length - 1;

	return (
		// <ul
		// 	style={{ position: 'relative' }}
		// 	className='max-w-[40rem] w-full h-full flex flex-col gap-10 overflow-y-auto mx-auto'
		// 	// className='py-5 space-y-5'
		// >

		<>
			{updatedList.map((item, index) => {
				// const top = index + state.start + 'px';
				const top = 195 * (index + state.start) + 'px';

				const refVal = getReference(index, index === lastIndex);
				const id = index === 0 ? 'top' : index === lastIndex ? 'bottom' : '';
				return (
					// <li className='' key={item.id} style={{ top }} ref={refVal} id={id}>
					// 	{item.text}
					// </li>

					<div
						key={item.id}
						style={{ top }}
						ref={refVal}
						id={id}
						className='dark:bg-dark-primary dark:hover:bg-dark-primary/50 border dark:border-dark-border transition-all p-5 flex justify-between items-center rounded-2xl'
					>
						<div className='flex justify-center gap-5'>
							<Link to='/'>
								<img
									className='profile'
									src={item.avatar}
									alt="A B M Zubayer's profile"
								/>
							</Link>
							<div className='flex flex-col'>
								<Link to='/' className='title'>
									{item.text}
								</Link>
								<span className='title font-normal text-sm text-dark-muted'>
									{item.timestamps}
								</span>
							</div>
						</div>

						<HorizontalMore />
					</div>
				);
			})}
		</>
	);
};

export default PartialNotifications;
