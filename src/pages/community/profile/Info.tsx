import { skipToken } from '@reduxjs/toolkit/query';
import { Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import {
	useGetCommunityQuery,
	useGetCommunityRulesQuery,
	useGetMembersQuery,
} from '../../../features/community/communityApi';
import CenterLayout from '../../../layouts/CenterLayout';
import MemberItem from './partials/MemberItem';

const Info = () => {
	const params = useParams();
	const { data, isSuccess } = useGetCommunityRulesQuery(
		params.id! ?? skipToken
	);
	const { data: community } = useGetCommunityQuery(params.id! ?? skipToken);
	const { data: membersData } = useGetMembersQuery({
		community_id: params.id ?? skipToken,
		page: 1,
		limit: 5,
	});
	const navigate = useNavigate();

	const handleMore = () => {
		navigate(`/communities/${params.id}?sec=members&filterBy=all`);
	};

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div>
				<h1 className='title'>Community Info</h1>
				<h3 className='muted mb-7'>Developer Community</h3>

				<div className='flex items-center gap-2'>
					<Calendar className='text-light-primary' strokeWidth={1.5} />

					<p>
						<span className='title font-normal text-sm'>
							Created at{' '}
							{new Date(community?.createdAt || '').toLocaleDateString(
								'en-US',
								{ month: 'long', year: 'numeric' }
							)}
						</span>
					</p>
				</div>

				<div className='my-7'>
					<h1 className='title'>About</h1>
					<h3 className='muted mb-7'>{community?.description}</h3>
				</div>

				{isSuccess && data.rules.length ? (
					<div className='my-7'>
						<h1 className='title'>Rules</h1>
						<p className='muted'>
							Everyone should follow these rules and guidelines provided by
							community admins.
						</p>
						<ul className='flex flex-col gap-8 my-5 ml-10 list-decimal text-light-primary/80 font-bold'>
							{data.rules.map(({ rule_id, title, body }) => (
								<li key={rule_id}>
									<h4 className='title text-sm'>{title}</h4>
									<p className='muted'>{body}</p>
								</li>
							))}
						</ul>
					</div>
				) : null}

				<div>
					<h1 className='title'>Members</h1>
					<p className='muted'>
						All members of this community including authority.
					</p>

					<div className='flex flex-col gap-5 my-5'>
						{!membersData?.members.length ? (
							<h1 className='title text-red'>No Member Exist</h1>
						) : (
							membersData.members.map((member) => <MemberItem {...member} />)
						)}
					</div>

					<Button text='See more' fullWidth size='small' onClick={handleMore} />
				</div>
			</div>
		</CenterLayout>
	);
};

export default Info;
