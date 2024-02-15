import {
	NotificationActionableItem,
	NotificationItem,
} from './partials/NotificationItem';

const Notification = () => {
	return (
		<div className='py-5 h-screen overflow-y-auto scrollbar-none'>
			<div className='title text-2xl'>Notifications</div>
			<div className='mt-10 space-y-5'>
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationActionableItem />
				<NotificationActionableItem />
				<NotificationActionableItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationActionableItem />
				<NotificationItem />
				<NotificationItem />
			</div>
		</div>
	);
};

export default Notification;
