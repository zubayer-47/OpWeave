import { Bell, Bolt, LogOut, Mail, User2, Users2 } from 'lucide-react';
import profile from '../../assets/profile.webp';
('lucide-react');

const SubModal = () => {
	return (
		<div className='absolute top-24 right-14 w-full md:w-96 bg-dark-subModal p-3 shadow-sub-modal rounded-2xl divide-y divide-dark-muted/50'>
			<button
				type='button'
				className='flex items-center gap-3 px-4 py-2 hover:bg-light-bg/10 w-full rounded-xl transition-colors mb-3'
			>
				<img className='profile' src={profile} alt='' />

				<div className='flex flex-col justify-start items-start'>
					<h1 className='title'>A B M Zubayer</h1>
					<span className='title text-sm text-dark-muted'>@zubayerjs</span>
				</div>
			</button>

			<div className='flex flex-col gap-2 py-3'>
				<button className='subModal-item justify-start gap-4'>
					<User2 className='icon' />
					<h1 className='title font-medium text-base'>Profile</h1>
				</button>

				<button className='subModal-item'>
					<p className='flex items-center gap-4'>
						<Bell className='icon' />
						<h1 className='title font-medium text-base'>Notifications</h1>
					</p>

					<p className='badge'>
						<span className='badge-text'>3</span>
					</p>
				</button>

				<button className='subModal-item'>
					<p className='flex items-center gap-4'>
						<Mail className='icon' />
						<h1 className='title font-medium text-base'>Messages</h1>
					</p>

					<p className='badge'>
						<span className='badge-text'>3</span>
					</p>
				</button>

				<button className='subModal-item justify-start gap-4'>
					<Users2 className='icon' />
					<h1 className='title font-medium text-base'>Communities</h1>
				</button>

				<button className='subModal-item justify-start gap-4'>
					<Bolt className='icon' />
					<h1 className='title font-medium text-base'>Settings</h1>
				</button>
			</div>

			<div className='pt-3'>
				<button className='subModal-item justify-start gap-4'>
					<LogOut className='icon' />
					<h1 className='title font-medium text-base'>Settings</h1>
				</button>
			</div>

			{/* <hr className='border-x-2 border-dark-muted/50' /> */}
		</div>
	);
};

export default SubModal;
