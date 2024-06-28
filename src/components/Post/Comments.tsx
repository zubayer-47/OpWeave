import { useState } from 'react';
import profile from '../../assets/profile2.jpg';
import Replies from './Replies';

const Comments = () => {
	const [showReplies, setShowReplies] = useState(false);

	return (
		<>
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
					accusamus nobis unde nesciunt dolorem! Quisquam, cupiditate obcaecati?
					Blanditiis corporis eos laborum. Praesentium sint minus eaque deserunt
					ea adipisci. Molestiae atque dolores iure fuga quia reprehenderit a
					laborum corrupti eos mollitia, maiores voluptatum. Velit vel quaerat
					exercitationem fugiat accusamus est placeat porro accusantium sit
					harum, sequi magnam consequuntur ad voluptates a ipsam temporibus
					nihil similique? Harum est dolore hic officiis beatae, sint obcaecati.
					Perferendis dolorum eveniet porro quisquam cum perspiciatis vel?
					Soluta itaque ipsum mollitia id ex, nemo nulla qui aperiam
					exercitationem odio?
				</p>
				{/* <h3 className='title font-normal mt-5 bg-blue-primary w-fit rounded-full px-2 py-1'>
						replies
					</h3> */}
				<button
					type='button'
					className='title font-normal text-dark-muted border border-dark-border h-fit px-2 py-0.5 rounded-full mt-5'
					onClick={() => setShowReplies((prev) => !prev)}
				>
					{10 > 1 ? '10 Replies' : '1 Reply'}
				</button>
			</div>

			{showReplies ? <Replies /> : null}
		</>
	);
};

export default Comments;
