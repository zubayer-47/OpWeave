import clsx from 'clsx';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile2.jpg';
import Hr from '../../components/Hr';
import useQuery from '../../hooks/useQuery';
import About from './partials/About';
import Communities from './partials/Communities';
import Photos from './partials/Photos';
import Timeline from './partials/Timeline';
import Videos from './partials/Videos';

const UserProfile = () => {
	const query = useQuery();

	let content: ReactNode;
	if (!query.get('sec')) content = <Timeline />;
	else if (query.get('sec') === 'timeline') content = <Timeline />;
	else if (query.get('sec') === 'communities') content = <Communities />;
	else if (query.get('sec') === 'photos') content = <Photos />;
	else if (query.get('sec') === 'videos') content = <Videos />;
	else if (query.get('sec') === 'about') content = <About />;

	const navLinkStyles = 'border-b-[3px] rounded-sm px-3 border-blue-primary';

	return (
		<div className='mt-28'>
			<div className='flex justify-center items-center'>
				<div className='flex flex-col justify-center items-center'>
					<img
						className='size-52 object-cover rounded-full'
						src={profile}
						alt='user profile'
					/>

					<h1 className='title text-2xl mt-5'>A B M Zubayer</h1>
					<span className='muted'>Start small and build momentum</span>
				</div>
			</div>

			<div className='flex justify-center items-center gap-20 mt-10 mb-0.5 px-14'>
				<Link
					to={`/profile?sec=timeline`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'timeline' && navLinkStyles
					)}
				>
					Timeline
				</Link>
				<Link
					to={`/profile?sec=communities`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'communities' && navLinkStyles
					)}
				>
					Communities
				</Link>
				<Link
					to={`/profile?sec=photos`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'photos' && navLinkStyles
					)}
				>
					Photos
				</Link>
				<Link
					to={`/profile?sec=videos`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'videos' && navLinkStyles
					)}
				>
					Videos
				</Link>
				<Link
					to={`/profile?sec=about`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'about' && navLinkStyles
					)}
				>
					About
				</Link>
			</div>
			<Hr />

			{content}
		</div>
	);
};

export default UserProfile;