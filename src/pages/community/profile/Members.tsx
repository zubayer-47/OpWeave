import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';
import useQuery from '../../../hooks/useQueryParams';
import CenterLayout from '../../../layouts/CenterLayout';
import MemberItem from './partials/MemberItem';

const Members = () => {
	const params = useParams();
	const query = useQuery();
	const navigate = useNavigate();

	const filterByQuery = query.get('filterBy');

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
					<MemberItem />
					<MemberItem />
					<MemberItem />
				</div>
			</div>
		</CenterLayout>
	);
};

export default Members;
