import { User2 } from 'lucide-react';
import Button from '../../../../components/Buttons/Button';
import { MemberType } from '../../../../features/community/types';

type Props = MemberType;

const MemberItem = ({ user: { fullname, avatar }, role }: Props) => {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center gap-2'>
				<img src={avatar} className='profile' alt="Member's Profile" />

				<div>
					<h1 className='title font-normal'>{fullname}</h1>
					<span className='muted'>{role}</span>
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
