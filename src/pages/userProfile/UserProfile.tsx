import clsx from 'clsx';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Hr from '../../components/Hr';
import Communities from './partials/Communities';
import Timeline from './partials/Timeline';

import data from '../../../data.json';
import { useAppSelector } from '../../app/hooks';
import defaultProfile from '../../assets/default.jpg';
import Photos from '../../components/Photos';
import Videos from '../../components/Videos';
import useQueryParams from '../../hooks/useQueryParams';

const slicedData = data.slice(10, 20);

const UserProfile = () => {
	const user = useAppSelector((state) => state.auth.user);
	const query = useQueryParams();

	let content: ReactNode;
	if (!query.get('sec')) content = <Timeline />;
	else if (query.get('sec') === 'timeline') content = <Timeline />;
	else if (query.get('sec') === 'communities') content = <Communities />;
	else if (query.get('sec') === 'photos')
		content = <Photos data={slicedData} />;
	else if (query.get('sec') === 'videos')
		content = <Videos data={slicedData} />;

	const navLinkStyles = 'border-b-[3px] rounded-sm px-3 border-blue-primary';

	return (
		<div className='mt-28'>
			<div className='flex justify-center items-center'>
				<div className='flex flex-col justify-center items-center'>
					<img
						className='size-52 object-cover rounded-full'
						src={user?.avatar || defaultProfile}
						alt='user profile'
					/>

					<h1 className='title text-2xl mt-5'>{user?.fullname}</h1>
					<span className='muted'>{user?.bio}</span>
				</div>
			</div>

			<div className='flex justify-center items-center gap-20 mt-10 mb-0.5 px-14'>
				<Link
					to={`/profile/${user?.username}?sec=timeline`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'timeline' && navLinkStyles
					)}
				>
					Timeline
				</Link>
				<Link
					to={`/profile/${user?.username}?sec=communities`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'communities' && navLinkStyles
					)}
				>
					Communities
				</Link>
				<Link
					to={`/profile/${user?.username}?sec=photos`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'photos' && navLinkStyles
					)}
				>
					Photos
				</Link>
				<Link
					to={`/profile/${user?.username}?sec=videos`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'videos' && navLinkStyles
					)}
				>
					Videos
				</Link>
			</div>
			<Hr />

			{content}
		</div>
	);
};

export default UserProfile;
