import clsx from 'clsx';
import { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import profile from '../../assets/profile2.jpg';
import HorizontalMore from '../../components/Buttons/HorizontalMore';
import Hr from '../../components/Hr';
import useQuery from '../../hooks/useQuery';
import Info from './profile/Info';
import Members from './profile/Members';
import Photos from './profile/Photos';
import Posts from './profile/Posts';
import Videos from './profile/Videos';

const Community = () => {
	const query = useQuery();
	const params = useParams();

	let content: ReactNode;
	if (!query.get('sec')) content = <Posts />;
	else if (query.get('sec') === 'posts') content = <Posts />;
	else if (query.get('sec') === 'info') content = <Info />;
	else if (query.get('sec') === 'photos') content = <Photos />;
	else if (query.get('sec') === 'videos') content = <Videos />;
	else if (query.get('sec') === 'members') content = <Members />;

	return (
		<div className='mt-28'>
			<div className='flex items-center justify-between px-14'>
				<div className='flex items-end gap-5'>
					<img
						className='size-40 object-cover rounded-full'
						src={profile}
						alt='community profile'
					/>

					<div className='mb-3'>
						<h1 className='title text-xl'>Dev Community</h1>
						<span className='muted'>Developer Community</span>
					</div>
				</div>

				<HorizontalMore />
			</div>

			<div className='flex justify-start items-center gap-20 mt-10 mb-0.5 px-14'>
				<Link
					to={`/communities/${params.id}?sec=posts`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'posts' &&
							'border-b-[3px] rounded-sm px-3 border-blue-primary'
					)}
				>
					Posts
				</Link>
				<Link
					to={`/communities/${params.id}?sec=info`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'info' &&
							'border-b-[3px] rounded-sm px-3 border-blue-primary'
					)}
				>
					Info
				</Link>
				<Link
					to={`/communities/${params.id}?sec=photos`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'photos' &&
							'border-b-[3px] rounded-sm px-3 border-blue-primary'
					)}
				>
					Photos
				</Link>
				<Link
					to={`/communities/${params.id}?sec=videos`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'videos' &&
							'border-b-[3px] rounded-sm px-3 border-blue-primary'
					)}
				>
					Videos
				</Link>
				<Link
					to={`/communities/${params.id}?sec=members`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'members' &&
							'border-b-[3px] rounded-sm px-3 border-blue-primary'
					)}
				>
					Members
				</Link>
			</div>
			<Hr />

			{content}
		</div>
	);
};

export default Community;
