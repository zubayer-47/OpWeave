import { Calendar, User2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import profile from '../../../assets/profile2.jpg';
import Button from '../../../components/Buttons/Button';
import CenterLayout from '../../../layouts/CenterLayout';

const Info = () => {
	const navigate = useNavigate();
	const params = useParams();

	const handleMore = () => {
		navigate(`/communities/${params.id}?sec=members&filterBy=all`);
	};

	return (
		<CenterLayout className='max-w-102 w-full my-10'>
			<div>
				<h1 className='title'>Community Info</h1>
				<h3 className='muted mb-7'>Developer Community</h3>

				<div className='flex items-center gap-2'>
					<Calendar className='text-light-primary' strokeWidth={1.5} />

					<p>
						<span className='title font-normal text-sm'>
							Created February, 2023 by
						</span>
						<span className='title text-sm'>@zubayerjs</span>
					</p>
				</div>

				<div className='my-7'>
					<h1 className='title'>Rules</h1>
					<p className='muted'>
						Everyone should follow these rules and guidelines provided by
						community admins.
					</p>
					<ul className='flex flex-col gap-8 my-5 ml-10 list-decimal text-light-primary/80 font-bold'>
						<li>
							<h4 className='title text-sm'>Be kind to others</h4>
							<p className='muted'>
								You should response in a good manner way to everyone in your
								team. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Quo, iusto?
							</p>
						</li>
						<li>
							<h4 className='title text-sm'>Be kind to others</h4>
							<p className='muted'>
								You should response in a good manner way to everyone in your
								team. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Quo, iusto?
							</p>
						</li>
						<li>
							<h4 className='title text-sm'>Be kind to others</h4>
							<p className='muted'>
								You should response in a good manner way to everyone in your
								team. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Quo, iusto?
							</p>
						</li>
					</ul>
				</div>

				<div>
					<h1 className='title'>Members</h1>
					<p className='muted'>
						All members of this community including authority.
					</p>

					<div className='flex flex-col gap-5 my-5'>
						{/* items */}
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-3'>
								<img src={profile} className='profile' alt="Member's Profile" />

								<div>
									<h1 className='title'>A B M Zubayer</h1>
									{/* // TODO: it should be beautiful button */}
									<button type='button' className='muted'>
										Member
									</button>
								</div>
							</div>

							<Button
								text='View Profile'
								icon={<User2 className='size-5' />}
								size='small'
								variant='outline'
							/>
						</div>
						{/* items */}
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-3'>
								<img src={profile} className='profile' alt="Member's Profile" />

								<div>
									<h1 className='title'>A B M Zubayer</h1>
									{/* // TODO: it should be beautiful button */}
									<button type='button' className='muted'>
										Member
									</button>
								</div>
							</div>

							<Button
								text='View Profile'
								icon={<User2 className='size-5' />}
								size='small'
								variant='outline'
							/>
						</div>
					</div>

					<Button text='See more' fullWidth size='small' onClick={handleMore} />
				</div>
			</div>
		</CenterLayout>
	);
};

export default Info;
