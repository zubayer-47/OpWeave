import { User2 } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Buttons/Button';
import { MemberType } from '../../../../features/community/types';

type Props = MemberType;

const MemberItem = ({ user: { fullname, username, avatar }, role }: Props) => {
	const navigate = useNavigate();

	const handleVisitProfile = () => {
		navigate(`/profile/${username}?sec=timeline`);
	};

	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center gap-2'>
				<LazyLoadImage
					src={avatar}
					className='profile'
					alt="Member's Profile"
					effect='blur'
				/>
				<div>
					<h1 className='title font-normal'>{fullname}</h1>
					<span className='muted'>{role}</span>
				</div>
			</div>

			<Button
				onClick={handleVisitProfile}
				text='View Profile'
				icon={<User2 className='size-5' />}
				size='small'
				variant='outline'
			/>
		</div>
	);
};

export default MemberItem;
