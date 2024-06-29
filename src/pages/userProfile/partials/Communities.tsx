import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router-dom';
import { useGetUserProfileCommunitiesQuery } from '../../../features/community/communityApi';
import CenterLayout from '../../../layouts/CenterLayout';
import CommunityItem from '../../communities/partials/CommunityItem';

const Communities = () => {
	const params = useParams();
	const { data, isLoading } = useGetUserProfileCommunitiesQuery(
		params.username || skipToken
	);

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='py-5 space-y-5'>
				<h1 className='title text-2xl'>Communities you're in</h1>
				{isLoading ? (
					<h1 className='title'>Loading...</h1>
				) : (
					data?.communities.length &&
					data.communities.map(({ community_id, name, bio, avatar }) => (
						<CommunityItem
							key={community_id}
							name={name}
							bio={bio}
							community_id={community_id}
							avatar={avatar}
						/>
					))
				)}
			</div>
		</CenterLayout>
	);
};

export default Communities;
