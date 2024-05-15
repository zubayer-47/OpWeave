import { Loader, LoaderCircle, PencilRuler } from 'lucide-react';
import { Link, Outlet, useParams } from 'react-router-dom';

const ManageCommunity = () => {
	const params = useParams();
	const path = `/communities/${params.id}/manage`;

	return (
		<div className='grid grid-cols-5 gap-5'>
			<div className='col-span-1 space-y-2'>
				<span className='title text-sm text-dark-muted px-3'>
					Administrator's tools
				</span>
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

			<div className='col-span-4'>
				<Outlet />
			</div>
		</div>
	);
};

export default ManageCommunity;
