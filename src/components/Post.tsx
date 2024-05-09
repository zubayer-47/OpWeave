import { Heart, MoreHorizontal, Users2 } from 'lucide-react';
import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import bookmark from '../assets/icons/bookmark.svg';
import comment from '../assets/icons/comment.svg';
import share from '../assets/icons/share.svg';
import Button from './Buttons/Button';

type Props = {
	avatar: string;
	fullname: string;
	username: string;
	community_name: string;
	body: string;
	// El: JSX.ElementType;
};

const Post = ({
	avatar,
	body,
	community_name,
	fullname,
	username,
}: // El,
Props) => {
	const [expanded, setExpanded] = useState(false);
	const content = ReactHtmlParser(body);
	// console.log('content :', content);

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	const isContentLong = content.length > 50;

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
				<>{isContentLong ? content.slice(0, 50) : content}</>
				{/* {content.length < 200 && !expanded ? content : trunc(content, 200)} */}
				{/* {content} */}
			</div>
			{content.length < 200 ? null : expanded ? (
				<button className='title text-base' onClick={toggleExpanded}>
					See Less
				</button>
			) : (
				<button className='title text-base' onClick={toggleExpanded}>
					See More
				</button>
			)}
			<hr className='border-t dark:border-dark-border border-light-border absolute bottom-[3.9rem] right-0 left-0' />
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					{/* <img src={heart} className='size-10' alt='like post icon' /> */}
					<Heart className='size-8 text-light-muted dark:text-dark-muted' />
					<img src={comment} className='size-10' alt='comment on post icon' />
					<img src={share} className='size-9' alt='share post icon' />
				</div>

				<img src={bookmark} className='size-10' alt='save post' />
			</div>
		</div>
	);
};

export default Post;
