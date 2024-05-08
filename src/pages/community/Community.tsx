import clsx from 'clsx';
import { Bell, Compass } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import data from '../../../data.json';
import profile from '../../assets/profile2.jpg';
import Button from '../../components/Buttons/Button';
import HorizontalMore from '../../components/Buttons/HorizontalMore';
import Hr from '../../components/Hr';
import Photos from '../../components/Photos';
import Videos from '../../components/Videos';
import useQuery from '../../hooks/useQueryParams';
import Info from './profile/Info';
import Members from './profile/Members';
import Posts from './profile/Posts';

const slicedData = data.slice(10, 20);

const Community = () => {
	const query = useQuery();
	const params = useParams();

	const [communityOption, setCommunityOption] = useState(false);

	let content: ReactNode;
	if (!query.get('sec')) content = <Posts />;
	else if (query.get('sec') === 'posts') content = <Posts />;
	else if (query.get('sec') === 'info') content = <Info />;
	else if (query.get('sec') === 'photos')
		content = <Photos data={slicedData} />;
	else if (query.get('sec') === 'videos')
		content = <Videos data={slicedData} />;
	else if (query.get('sec') === 'members') content = <Members />;

	const navLinkStyles = 'border-b-[3px] rounded-sm px-3 border-blue-primary';

	const isJoined = true;

	const handleClose = () => {};

	return (
		<div className='mt-28'>
			<div className='flex items-center justify-between px-14 relative'>
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

				{!isJoined ? (
					<Button text='Join' />
				) : (
					<HorizontalMore
						onClick={() => setCommunityOption((prev) => !prev)}
						type='button'
					/>
				)}

				{!communityOption ? null : (
					<div className='dark:bg-dark-primary px-1 absolute right-16 top-24 flex flex-col border dark:border-dark-border rounded-xl z-10'>
						<button
							onClick={handleClose}
							className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
						>
							<Compass className='text-light-primary' strokeWidth={1.5} />
							<h3 className='title text-sm font-normal'>More Option</h3>
						</button>
						<hr className='border-t-2 dark:border-dark-border' />
						<button
							onClick={handleClose}
							className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
						>
							<Bell className='text-light-primary' strokeWidth={1.5} />
							<h3 className='title text-sm font-normal'>More Option</h3>
						</button>
					</div>
				)}
			</div>

			<div className='flex justify-start items-center gap-20 mt-10 mb-0.5 px-14'>
				<Link
					to={`/communities/${params.id}?sec=posts`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'posts' && navLinkStyles
					)}
				>
					Posts
				</Link>
				<Link
					to={`/communities/${params.id}?sec=info`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'info' && navLinkStyles
					)}
				>
					Info
				</Link>
				<Link
					to={`/communities/${params.id}?sec=photos`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'photos' && navLinkStyles
					)}
				>
					Photos
				</Link>
				<Link
					to={`/communities/${params.id}?sec=videos`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'videos' && navLinkStyles
					)}
				>
					Videos
				</Link>
				<Link
					to={`/communities/${params.id}?sec=members&filterBy=all`}
					type='button'
					className={clsx(
						'title transition-all',
						query.get('sec') === 'members' && navLinkStyles
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
