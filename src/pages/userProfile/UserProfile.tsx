import clsx from 'clsx';
import { ReactNode, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Hr from '../../components/Hr';
import Communities from './partials/Communities';
import Timeline from './partials/Timeline';

import { skipToken } from '@reduxjs/toolkit/query';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import data from '../../../data.json';
import Photos from '../../components/Photos';
import Videos from '../../components/Videos';
import { useGetUserProfileQuery } from '../../features/user/userApi';
import useQueryParams from '../../hooks/useQueryParams';
import CenterLayout from '../../layouts/CenterLayout';
import Bookmarks from './partials/Bookmarks';

const slicedData = data.slice(10, 20);

const UserProfile = () => {
	const params = useParams();
	const { data } = useGetUserProfileQuery(params.username || skipToken);
	const query = useQueryParams();
	const scrollDivRef = useRef<HTMLDivElement>(null);

	let content: ReactNode;
	if (!query.get('sec')) content = <Timeline scrollDivRef={scrollDivRef} />;
	else if (query.get('sec') === 'timeline')
		content = <Timeline scrollDivRef={scrollDivRef} />;
	else if (query.get('sec') === 'communities') content = <Communities />;
	else if (query.get('sec') === 'bookmarks')
		content = <Bookmarks scrollDivRef={scrollDivRef} />;
	else if (query.get('sec') === 'photos')
		content = <Photos data={slicedData} />;
	else if (query.get('sec') === 'videos')
		content = <Videos data={slicedData} />;

	const navLinkStyles = 'border-b-[3px] rounded-sm px-3 border-blue-primary';

	return (
		<CenterLayout hasNav>
			<div
				className={clsx(
					// 'mt-0 md:mt-28 mb-10',
					'w-full height_without_nav py-5 overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary',
					'px-2 md:px-0'
				)}
				ref={scrollDivRef}
			>
				<div className='flex justify-center items-center'>
					<div className='flex flex-col justify-center items-center'>
						<LazyLoadImage
							src={data?.avatar}
							className='size-36 md:size-52 object-cover rounded-full'
							alt='user profile'
							effect='blur'
						/>

						<h1 className='title text-xl md:text-2xl mt-5'>{data?.fullname}</h1>
						<span className='muted'>{data?.bio}</span>
					</div>
					N
				</div>

				<div className='container mx-auto max-w-102 w-full flex items-center gap-10 mt-10 mb-0.5 px-10 overflow-x-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'>
					<Link
						to={`/profile/${data?.username}?sec=timeline`}
						type='button'
						className={clsx(
							'title transition-all',
							query.get('sec') === 'timeline' && navLinkStyles
						)}
					>
						Timeline
					</Link>
					<Link
						to={`/profile/${data?.username}?sec=communities`}
						type='button'
						className={clsx(
							'title transition-all',
							query.get('sec') === 'communities' && navLinkStyles
						)}
					>
						Communities
					</Link>
					<Link
						to={`/profile/${data?.username}?sec=bookmarks`}
						type='button'
						className={clsx(
							'title transition-all',
							query.get('sec') === 'bookmarks' && navLinkStyles
						)}
					>
						Bookmarks
					</Link>
					<Link
						to={`/profile/${data?.username}?sec=photos`}
						type='button'
						className={clsx(
							'title transition-all',
							query.get('sec') === 'photos' && navLinkStyles
						)}
					>
						Photos
					</Link>
					<Link
						to={`/profile/${data?.username}?sec=videos`}
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
		</CenterLayout>
	);
};

export default UserProfile;
