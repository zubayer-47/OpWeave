import { FC } from 'react';
import { Link } from 'react-router-dom';
import CenterLayout from '../layouts/CenterLayout';

type Props = {
	data: { name: string; createdAt: string; avatar: string; id: string }[];
};

const Photos: FC<Props> = ({ data }) => {
	console.log('first');
	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='py-5 space-y-5'>
				<h1 className='title text-2xl'>Photos</h1>

				<div className='grid grid-cols-3 gap-5'>
					{data.map(({ id, avatar }) => (
						// <Link to='' className='hover:shadow-2xl shadow-gray-200'>
						<Link
							to=''
							className='w-full h-56 rounded-md overflow-hidden hover:scale-110 hover:opacity-75 transition-all'
						>
							<img
								key={id}
								className='size-full object-cover'
								src={avatar}
								alt='post photo'
							/>
						</Link>
						// </Link>
					))}
				</div>
			</div>
		</CenterLayout>
	);
};

export default Photos;
