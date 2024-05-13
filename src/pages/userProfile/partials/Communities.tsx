import data from '../../../../data.json';
import { MemberRole } from '../../../features/community/types';
import CenterLayout from '../../../layouts/CenterLayout';
import CommunityItem from '../../communities/partials/CommunityItem';

const slicedData = data.slice(10, 20);

const Communities = () => {
	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div className='py-5 space-y-5'>
				<h1 className='title text-2xl'>Communities you're in</h1>
				{slicedData.map(({ id, createdAt, name }) => (
					<CommunityItem
						key={id}
						// avatar={avatar}
						bio={name}
						name={name}
						createdAt={createdAt}
						avatar=''
						community_id=''
						description=''
						member={{ member_id: '', role: MemberRole.ADMIN }}
					/>
				))}
			</div>
		</CenterLayout>
	);
};

export default Communities;
