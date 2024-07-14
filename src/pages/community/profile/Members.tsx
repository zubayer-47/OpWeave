import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import {
	useGetMembersQuery,
	useLazyGetMembersQuery,
} from '../../../features/community/communityApi';
import { FilterBy, MemberRole } from '../../../features/community/types';
import useQueryParams from '../../../hooks/useQueryParams';
import CenterLayout from '../../../layouts/CenterLayout';
import MemberItem from './partials/MemberItem';

type Props = {
	current_user_role: MemberRole;
};

const Members: FC<Props> = ({ current_user_role }) => {
	const [page, setPage] = useState(1);
	const params = useParams();
	const query = useQueryParams();
	const filterByQuery = query.get('filterBy');

	const { data, isSuccess: membersSuccess } = useGetMembersQuery({
		community_id: params.id ?? skipToken,
		filterBy: (filterByQuery ?? 'all') as FilterBy,
	});
	const [trigger, result] = useLazyGetMembersQuery();

	const membersData = result.data ?? data;
	const isSuccess = result.isSuccess || membersSuccess;

	const navigate = useNavigate();

	const hasMore = result.data?.hasMore ?? data?.hasMore;

	const fetchNext = () => {
		if (hasMore) {
			trigger(
				{
					community_id: params.id ?? skipToken,
					filterBy: (filterByQuery ?? 'all') as FilterBy,
					page: page + 1,
				},
				true
			);

			setPage((prev) => prev + 1);
		}
	};

	const fetchPrev = () => {
		if (page > 1) {
			trigger(
				{
					community_id: params.id ?? skipToken,
					filterBy: (filterByQuery ?? 'all') as FilterBy,
					page: page - 1,
				},
				true
			);

			setPage((prev) => prev - 1);
		}
	};

	const handleFilterType = (filterBy: 'all' | 'authority'): void => {
		navigate(`/communities/${params.id}?sec=members&filterBy=${filterBy}`);
	};

	return (
		<CenterLayout className='max-w-102 w-full my-10 h-screen'>
			<div>
				<div className='flex justify-between px-10 items-center my-7 border-b dark:border-dark-border'>
					<button
						onClick={() => handleFilterType('all')}
						className={clsx(
							{
								'border-b-[3px] rounded-sm px-3 border-blue-primary':
									filterByQuery === 'all',
							},
							'title',
							'transition-all'
						)}
					>
						All
					</button>
					<button
						onClick={() => handleFilterType('authority')}
						className={clsx(
							{
								'border-b-[3px] rounded-sm px-3 border-blue-primary':
									filterByQuery === 'authority',
							},
							'title',
							'transition-all'
						)}
					>
						Authority
					</button>
				</div>

				<div className='flex flex-col gap-5 my-5'>
					{isSuccess
						? membersData?.members.map((member) => (
								<MemberItem
									key={member.member_id}
									{...member}
									current_user_role={current_user_role}
								/>
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  ))
						: null}
				</div>

				<div className='flex justify-between items-center'>
					<Button
						onClick={fetchPrev}
						text='Prev'
						size='small'
						disabled={page === 1}
					/>
					<Button
						onClick={fetchNext}
						text='Next'
						size='small'
						disabled={!hasMore}
					/>
				</div>
			</div>
		</CenterLayout>
	);
};

export default Members;
