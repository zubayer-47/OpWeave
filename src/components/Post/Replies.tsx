import profile from '../../assets/profile.webp';

const Replies = () => {
	const replies = [
		{
			comment_id: 'd1b55b3c-542b-4664-b8e8-1462826d96d4',
			body: 'this is first testing comment reply',
			createdAt: '2024-06-27T20:08:05.572Z',
			updatedAt: '2024-06-27T20:08:05.572Z',
			deletedAt: null,
			member_id: 'd4397974-b70b-4f00-8e39-5719a8adf56d',
			post_id: '3e0ea6ba-7c8c-4992-9337-47c3741c046f',
			parent_comment_id: 'b4529ec4-0568-4ee0-93d5-d6c0719fb739',
		},
		{
			comment_id: '03fdc2a4-7208-4e43-8f84-54eef51c8ed4',
			body: 'Earum tempora qui dolore aliquid dolore repudiandae similique nobis.',
			createdAt: '2024-06-27T20:20:15.128Z',
			updatedAt: '2024-06-27T20:20:15.128Z',
			deletedAt: null,
			member_id: 'd4397974-b70b-4f00-8e39-5719a8adf56d',
			post_id: '3e0ea6ba-7c8c-4992-9337-47c3741c046f',
			parent_comment_id: 'b4529ec4-0568-4ee0-93d5-d6c0719fb739',
		},
		{
			comment_id: '4cb84b93-0721-4985-a157-56c670caba9f',
			body: 'Aut error vel numquam esse deserunt autem.',
			createdAt: '2024-06-27T20:20:17.930Z',
			updatedAt: '2024-06-27T20:20:17.930Z',
			deletedAt: null,
			member_id: 'd4397974-b70b-4f00-8e39-5719a8adf56d',
			post_id: '3e0ea6ba-7c8c-4992-9337-47c3741c046f',
			parent_comment_id: 'b4529ec4-0568-4ee0-93d5-d6c0719fb739',
		},
	];

	return (
		<div className='ps-10'>
			{replies.map(() => (
				<div className='bg-dark-border/30 hover:bg-dark-border/50 p-2 rounded-md mt-5'>
					<div className='flex items-stretch justify-start gap-2'>
						<img src={profile} className='profile' alt='' />
						<h1 className='title '>A B M Zubayer</h1>
						<h1 className='title font-normal text-sm text-dark-muted bg-dark-border h-fit px-1.5 py-0.5 rounded-full select-none'>
							Member
						</h1>
					</div>
					<p className='title font-normal font-Inter'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
						natus vitae fugiat omnis officia delectus, asperiores praesentium
						accusamus nobis unde nesciunt dolorem! Quisquam, cupiditate
						obcaecati? Blanditiis corporis eos laborum. Praesentium sint minus
						eaque deserunt ea adipisci. Molestiae atque dolores iure fuga quia
						reprehenderit a laborum corrupti eos mollitia, maiores voluptatum.
						Velit vel quaerat exercitationem fugiat accusamus est placeat porro
						accusantium sit harum, sequi magnam consequuntur ad voluptates a
						ipsam temporibus nihil similique? Harum est dolore hic officiis
						beatae, sint obcaecati. Perferendis dolorum eveniet porro quisquam
						cum perspiciatis vel? Soluta itaque ipsum mollitia id ex, nemo nulla
						qui aperiam exercitationem odio?
					</p>
					{/* <h3 className='title font-normal mt-5 bg-blue-primary w-fit rounded-full px-2 py-1'>
						replies
					</h3> */}
					{/* <button
						type='button'
						className='title font-normal text-dark-muted border border-dark-border h-fit px-2 py-0.5 rounded-full mt-5'
					>
						{10 > 1 ? '10 Replies' : '1 Reply'}
					</button> */}
				</div>
			))}
		</div>
	);
};

export default Replies;
