import clsx from 'clsx';
import { User2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import profile from '../../../assets/profile2.jpg';
import Button from '../../../components/Buttons/Button';
import useQuery from '../../../hooks/useQueryParams';
import CenterLayout from '../../../layouts/CenterLayout';

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
					{/* items */}
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<img src={profile} className='profile' alt="Member's Profile" />

							<div>
								<h1 className='title'>A B M Zubayer</h1>
								{/* // TODO: it should be beautiful button */}
								<button type='button' className='muted'>
									Member
								</button>
							</div>
						</div>

						<Button
							text='View Profile'
							icon={<User2 className='size-5' />}
							size='small'
							variant='outline'
						/>
					</div>
					{/* items */}
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<img src={profile} className='profile' alt="Member's Profile" />

							<div>
								<h1 className='title'>A B M Zubayer</h1>
								{/* // TODO: it should be beautiful button */}
								<button type='button' className='muted'>
									Member
								</button>
							</div>
						</div>

						<Button
							text='View Profile'
							icon={<User2 className='size-5' />}
							size='small'
							variant='outline'
						/>
					</div>
					{/* items */}
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<img src={profile} className='profile' alt="Member's Profile" />

							<div>
								<h1 className='title'>A B M Zubayer</h1>
								{/* // TODO: it should be beautiful button */}
								<button type='button' className='muted'>
									Member
								</button>
							</div>
						</div>

						<Button
							text='View Profile'
							icon={<User2 className='size-5' />}
							size='small'
							variant='outline'
						/>
					</div>
				</div>
			</div>
		</CenterLayout>
	);
};

export default Members;
