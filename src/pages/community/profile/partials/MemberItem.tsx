import { User2 } from 'lucide-react';
import profile from '../../../../assets/profile2.jpg';
import Button from '../../../../components/Buttons/Button';

const MemberItem = () => {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center gap-2'>
				<img src={profile} className='profile' alt="Member's Profile" />

				<div>
					<h1 className='title font-normal'>A B M Zubayer</h1>
					<span className='muted'>Member</span>
				</div>
			</div>

			<Button
				text='View Profile'
				icon={<User2 className='size-5' />}
				size='small'
				variant='outline'
			/>
		</div>
	);
};

export default MemberItem;
