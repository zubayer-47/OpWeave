import { ChevronDown, Loader, LoaderCircle, PencilRuler } from 'lucide-react';
import { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import CenterLayout from '../../../layouts/CenterLayout';

const ManageCommunity = () => {
	const [toggleTab, setToggleTab] = useState(false);
	const params = useParams();
	const path = `/communities/${params.id}/manage`;

	const toggleTabAction = () => {
		setToggleTab((prev) => !prev);
	};

	return (
		<CenterLayout hasNav>
			<div className='flex flex-col lg:grid lg:grid-cols-5 gap-5 py-5 px-2'>
				<div className='col-span-1 space-y-2'>
					<div className='flex justify-between items-center bg-dark-border w-full rounded-md relative'>
						<button
							className='title text-sm text-left text-light-primary p-3 w-full h-full'
							type='button'
							onClick={toggleTabAction}
						>
							Admin's tools
						</button>

						<ChevronDown className='absolute right-2 text-light-primary pointer-events-auto' />
					</div>
					{toggleTab ? (
						<div>
							<Link
								to={`${path}/rules`}
								className='flex items-center gap-3 p-3 rounded-lg bg-transparent hover:bg-dark-border/70 cursor-pointer transition-all'
							>
								<PencilRuler
									className='text-light-primary size-5'
									strokeWidth={1.5}
								/>
								<h1 className='title text-sm font-normal'>Community Rules</h1>
							</Link>
							<Link
								to={''}
								className='flex items-center gap-3 p-3 rounded-lg bg-transparent hover:bg-dark-border/70 cursor-pointer transition-all'
							>
								<Loader className='text-light-primary size-5' />
								<h1 className='title text-sm font-normal'>Pending Approvals</h1>
							</Link>
							<Link
								to={`${path}/pending_posts`}
								className='flex items-center gap-3 p-3 rounded-lg bg-transparent hover:bg-dark-border/70 cursor-pointer transition-all'
							>
								<LoaderCircle className='text-light-primary size-5' />
								<h1 className='title text-sm font-normal'>Pending Posts</h1>
							</Link>
						</div>
					) : null}
				</div>

				<div className='col-span-4'>
					<Outlet />
				</div>
			</div>
		</CenterLayout>
	);
};

export default ManageCommunity;
