import {
	Bookmark,
	Heart,
	MessageCircle,
	MessageSquareShare,
	MoreHorizontal,
	Users2,
} from 'lucide-react';
import { useState } from 'react';
import Button from './Buttons/Button';

type Props = {
	avatar: string;
	fullname: string;
	username: string;
	community_name: string;
	body: string;
	image_url: string;
	// El: JSX.ElementType;
};

const Post = ({
	avatar,
	body,
	image_url,
	community_name,
	fullname,
	username,
}: // El,
Props) => {
	const [expanded, setExpanded] = useState(false);
	// console.log('content :', content);

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	return (
		<div className='post px-7 pt-5 pb-3 relative'>
			<div className='flex-group justify-between'>
				<div className='flex-group'>
					<img className='profile' src={avatar} alt='profile picture' />
					<div>
						<h1 className='title'>{fullname}</h1>
						<span className='muted'>@{username}</span>
					</div>
				</div>

				<div className='flex flex-col items-end'>
					<div className='flex-group'>
						<Users2 className='icon size-6' />
						<button type='button' className='title text-sm'>
							{community_name}
						</button>
					</div>

					<div className='flex-group'>
						<Button text='Join' size='small' className='!py-1.5' />
						<button type='button'>
							<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary transition-colors' />
						</button>
					</div>
				</div>
			</div>
			{/* // TODO: 9/5 modify it */}
			{/* <button
				type='button'
				className='w-full max-h-[45rem] h-fit mt-5 overflow-hidden'
			>
				<img
					src={profile}
					className='size-full object-contain'
					alt='Post image'
				/>
			</button> */}

			<div className='title font-Inter font-normal text-base mt-5 mb-5 hyphens-auto text-ellipsis'>
				<>{body ? body.slice(0, 50) : body}</>
				{/* {content.length < 200 && !expanded ? content : trunc(content, 200)} */}
				{/* {content} */}
			</div>
			{body?.length < 200 ? null : expanded ? (
				<button className='title text-base' onClick={toggleExpanded}>
					See Less
				</button>
			) : (
				<button className='title text-base' onClick={toggleExpanded}>
					See More
				</button>
			)}

			{!!image_url && <img src={image_url} alt='Post Image' />}

			<hr className='border-t dark:border-dark-border border-light-border absolute bottom-14 right-0 left-0' />
			<div className='flex items-center justify-between mt-5'>
				<div className='flex items-center gap-3'>
					<Heart className='size-8 text-light-muted dark:text-dark-muted' />
					<MessageCircle className='size-8 text-light-muted dark:text-dark-muted' />
					<MessageSquareShare className='size-7 text-light-muted dark:text-dark-muted' />
				</div>
				<Bookmark className='size-8 text-light-muted dark:text-dark-muted' />
			</div>
		</div>
	);
};

export default Post;
