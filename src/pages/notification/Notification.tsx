import {
	NotificationActionableItem,
	NotificationItem,
} from './partials/NotificationItem';

const Notification = () => {
	return (
		<div className='py-5'>
			<div className='title'>Notifications</div>
			<div className='mt-10 space-y-5'>
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
