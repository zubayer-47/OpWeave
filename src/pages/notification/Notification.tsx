import {
	NotificationActionableItem,
	NotificationItem,
} from './partials/NotificationItem';

const Notification = () => {
	return (
		<div className='py-5 h-screen'>
			<div className='flex justify-between items-center'>
				<h1 className='title text-2xl'>Notifications</h1>
				<select data-te-select-init>
					<option value='1'>One</option>
					<option value='2'>Two</option>
					<option value='3'>Three</option>
					<option value='4'>Four</option>
					<option value='5'>Five</option>
					<option value='6'>Six</option>
					<option value='7'>Seven</option>
					<option value='8'>Eight</option>
				</select>
			</div>
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
