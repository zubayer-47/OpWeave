import clsx from 'clsx';
import { Image, MapPin, Smile } from 'lucide-react';
import { ChangeEvent, FC, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import profile from '../assets/profile.webp';
import { useGetUserCommunitiesQuery } from '../features/community/communityApi';
import { useCreatePostMutation } from '../features/post/postApi';
import { FormHandler } from '../types/custom';

interface Props {
	singleCommunity?: boolean;
}

const CreatePost: FC<Props> = ({ singleCommunity }) => {
	const [content, setContent] = useState('');
	const { data, isLoading } = useGetUserCommunitiesQuery();
	const [createPost] = useCreatePostMutation();
	const communityIdRef = useRef<HTMLSelectElement | null>(null);
	const dispatch = useAppDispatch();
	const params = useParams();

	const handleSubmit: FormHandler = (e) => {
		e.preventDefault();

		if (params?.id) {
			toast.promise(
				createPost({ community_id: params.id, payload: content }).unwrap(),
				{
					loading: 'Post creating...',
					success: 'Post Created Successfully.',
					error: 'Post could not create.',
				}
			);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	return (
		// <div
		// 	tabIndex={0}
		// 	className={clsx('post h-fit px-4 pt-6 relative')}
		// 	onBlur={(e) => {
		// 		e.preventDefault();
		// 		console.log('blurred');
		// 	}}
		// >
		<form
			onSubmit={handleSubmit}
			className={clsx('post h-fit px-4 pt-6 relative')}
			// onFocus={() => console.log('focus')}
			// onBlur={() => console.log('blur')}
		>
			<div className='flex justify-between items-start'>
				<div className='flex items-center gap-3'>
					<img className='profile' src={profile} alt='profile picture' />
					<div>
						<h1 className='title'>A B M Zubayer</h1>
						{singleCommunity ? null : (
							<div>
								<span className='title text-sm font-DM-Sans font-medium text-light-muted dark:text-dark-muted'>
									Post to:{' '}
								</span>
								<select
									name='community_id'
									className='cursor-pointer outline-none bg-transparent border border-light-muted/70 dark:border-dark-border rounded-full py-0.5 px-2 title text-sm font-DM-Sans font-medium text-light-muted dark:text-dark-muted max-w-fit'
									ref={communityIdRef}
								>
									<option value=''>Choose Community</option>
									{!isLoading && data?.communities.length
										? data.communities.map((community) => (
												<option
													key={community.community_id}
													value={community.community_id}
													className='title font-DM-Sans font-medium  text-light-muted dark:text-dark-muted text-sm bg-light-bg dark:bg-dark-bg'
												>
													{community.name}
												</option>

												// eslint-disable-next-line no-mixed-spaces-and-tabs
										  ))
										: null}
								</select>
							</div>
						)}
					</div>
				</div>
			</div>
			{/* 
				<ContentEditable
					innerRef={editableDivRef}
					html={content}
					className={clsx(
						'title text-base w-full resize rounded-md bg-transparent font-medium outline-none transition-all mt-5 h-40 overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
					)}
					onChange={handleChange}
					data-placeholder='Write your thoughts...'
				/> */}

			<textarea
				name='content'
				id='content'
				cols={30}
				rows={1}
				onFocus={(e) => {
					e.target.classList.add('bg-transparent/15');
					e.target.rows = 3;
				}}
				onChange={handleChange}
				className={clsx(
					'title text-base w-full resize p-2 rounded-md bg-transparent font-medium outline-none transition-all mt-5 overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
				)}
				placeholder='Write your thoughts..'
			></textarea>

			<div className='space-y-3 mt-3 mb-4'>
				<hr className='border-light-border dark:border-dark-border' />

				<div className='flex justify-between px-4'>
					<div className='flex items-center gap-4'>
						<button type='button'>
							<Image className='icon' />
						</button>
						<button type='button'>
							<MapPin className='icon' />
						</button>
						<button type='button'>
							<Smile className='icon' />
						</button>
					</div>
					<button
						className='title button text-sm text-light-text px-4 py-2 disabled:bg-nav-selected/50 disabled:text-light-text/80'
						disabled={!content}
						type='submit'
						// onClick={() => console.log('click')}
					>
						Post
					</button>
				</div>
			</div>
			{/* )} */}
		</form>
		// </div>
	);
};

export default CreatePost;
