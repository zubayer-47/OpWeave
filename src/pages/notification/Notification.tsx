import data from '../../../data.json';
import PartialNotifications from './partials/PartialNotifications';

const Notification = () => {
	// console.log(data);
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
				<PartialNotifications list={data} />

				{/* <NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem /> */}
				{/* <NotificationActionableItem />
				<NotificationActionableItem />
				<NotificationActionableItem /> */}
				{/* <NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationActionableItem />
				<NotificationItem />
				<NotificationItem /> */}
			</div>
		</div>
	);
};

export default Notification;
