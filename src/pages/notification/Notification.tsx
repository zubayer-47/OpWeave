import { useState } from 'react';
import { NotificationItem } from './partials/NotificationItem';

const data = [
	{
		name: 'Dr. Andrea Kerluke II',
		createdAt: '2025-08-22T04:54:35.597Z',
		avatar:
			'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/223.jpg',
		id: '7',
		action: true,
	},
	{
		name: 'Kerry Kuhn',
		createdAt: '2097-12-26T16:45:27.890Z',
		avatar:
			'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/586.jpg',
		id: '8',
		action: false,
	},
	{
		name: 'Caleb Toy',
		createdAt: '2088-02-09T21:56:22.138Z',
		avatar:
			'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/537.jpg',
		id: '9',
		action: false,
	},
	{
		name: 'Claudia Barrows',
		createdAt: '2034-09-04T09:03:35.644Z',
		avatar:
			'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/948.jpg',
		id: '10',
		action: true,
	},
	{
		name: 'Michael Lemke',
		createdAt: '2016-03-18T06:11:49.795Z',
		avatar:
			'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/568.jpg',
		id: '11',
		action: false,
	},
	{
		name: 'Brooke Bruen',
		createdAt: '2094-01-11T05:16:06.483Z',
		avatar:
			'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1019.jpg',
		id: '12',
		action: false,
	},
	{
		name: 'Shawna Medhurst',
		createdAt: '2080-11-15T07:42:02.716Z',
		avatar:
			'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/886.jpg',
		id: '13',
		action: false,
	},
	{
		name: 'Ira Stiedemann',
		createdAt: '2052-01-23T22:18:21.875Z',
		avatar:
			'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/939.jpg',
		id: '14',
		action: true,
	},
];

const Notification = () => {
	const [updatedOptionId, setUpdatedOptionId] = useState('');

	const handleOption = (id: string) => {
		setUpdatedOptionId(id);
	};

	const handleClose = () => {
		setUpdatedOptionId('');
	};

	return (
		<div className='py-5 h-screen'>
			{/* <div className='flex justify-between items-center'>
				<h1 className='title text-2xl'>Notifications</h1>
				<div className='flex justify-center items-center gap-2'>
					<span className='title text-sm'>Sort By</span>
					<select className='bg-light-muted/10 dark:bg-dark-muted/20 rounded-md p-2 outline-none title text-sm font-medium'>
						<option value='title'>Title</option>
						<option value='date'>Date</option>
					</select>
				</div>
			</div> */}
			<div className='py-5 space-y-5 relative'>
				{/* <PartialNotifications items={data} /> */}

				{data.map(({ id, action }) => (
					<NotificationItem
						action={action}
						id={id}
						updatedOptionId={updatedOptionId}
						handleClose={handleClose}
						handleOption={handleOption}
					/>
				))}
			</div>
		</div>
	);
};

export default Notification;
