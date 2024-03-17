import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import HorizontalCommunityItem from './HorizontalCommunityItem';

export type Community = {
	id: string;
	name: string;
	avatar: string;
	bio: string;
	createdAt: Date;
};

const FavCommunities = () => {
	const [communities, setCommunities] = useState<Community[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const scrollDiv = useRef<HTMLDivElement>(null);

	useEffect(() => {
		(async () => {
			const res = await fetch(
				`https://65218ee4a4199548356d5dc5.mockapi.io/api/v1/communities?page=${currentPage}&limit=20`
			);

			const data = (await res.json()) as Community[];

			setCommunities(data);
		})();
	}, [currentPage]);

	const prev = () => {
		const elem = scrollDiv.current;
		if (!elem) return;

		setCurrentPage((prev) => (prev !== 0 ? prev-- : 0));

		const width = elem?.clientWidth;

		elem.style.transform = `translateX(${width - width}px)`;

		console.log(elem.clientWidth);
	};

	const next = () => {
		const elem = scrollDiv.current;
		if (!elem) return;

		setCurrentPage((prev) => (prev !== 0 ? prev-- : 0));

		const width = elem?.clientWidth;

		elem.style.transform = `translateX(${width + width}px)`;

		console.log(elem.clientWidth);
	};

	return (
		<div className='space-y-5 relative'>
			<h1 className='title text-2xl'>Favorite Communities</h1>

			<div className='snap-x relative'>
				<button
					type='button'
					onClick={prev}
					className='absolute left-10 top-0 -translate-x-full translate-y-full z-10'
				>
					<ChevronLeft className='text-light-lighter size-10' />
				</button>

				<div
					ref={scrollDiv}
					className='flex justify-start items-stretch gap-5 overflow-x-auto snap-x'
				>
					{!communities.length ? (
						<p>Favorite Communities Not Found</p>
					) : (
						communities.map(({ avatar, bio, id, name }) => (
							<HorizontalCommunityItem
								avatar={avatar}
								bio={bio}
								key={id}
								name={name}
							/>
						))
					)}
				</div>

				<button
					type='button'
					onClick={next}
					className='absolute right-0 top-0 -translate-x-full translate-y-full'
				>
					<ChevronRight className='inline-block text-light-lighter size-10' />
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
