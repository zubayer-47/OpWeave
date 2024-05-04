import clsx from 'clsx';
import { Image, MapPin, Smile } from 'lucide-react';
import {
	ChangeEventHandler,
	FC,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import profile from '../assets/profile.webp';
import { useGetUserCommunitiesQuery } from '../features/community/communityApi';
import { FormHandler } from '../types/custom';

interface Props {
	// isModal?: boolean;
	singleCommunity?: boolean;
}

const CreatePost: FC<Props> = ({ singleCommunity }) => {
	const [isFocused, setFocused] = useState(false);
	const [text, setText] = useState('');
	const { data, isLoading } = useGetUserCommunitiesQuery();

	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const postCommunityRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	if (isModal) {
	// 		setFocused(true);
	// 		wrapperRef.current?.focus();
	// 		console.log('first');
	// 		if (postCommunityRef.current) postCommunityRef.current.hidden = false;
	// 	}
	// }, [isModal]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!wrapperRef.current?.contains(event.target as Node | null)) {
				wrapperRef.current?.blur();
				if (postCommunityRef.current) postCommunityRef.current.hidden = true;
				setFocused(false);
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [wrapperRef]);

	const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		const value = e.target.value;

		setText(value);
	};

	const onFocus = useCallback(() => {
		setFocused(true);

		if (textAreaRef?.current && postCommunityRef?.current) {
			textAreaRef.current?.focus();
			postCommunityRef.current.hidden = false;
		}
	}, []);

	const handleSubmit: FormHandler = (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = {
			community_id: formData.get('community_id'),
		};
		console.log('data :', data);
	};

	return (
		<div
		// className={clsx(
		// 	isModal &&
		// 		'fixed inset-0 bg-light-bg dark:bg-dark-bg/75 flex justify-center'
		// )}
		>
			{/* {isModal ? (
				<button
					className='bg-transparent inset-0 absolute'
					onClick={() => updatePostModal(false)}
				></button>
			) : null} */}
			<div
				ref={wrapperRef}
				tabIndex={0}
				onFocus={onFocus}
				className={clsx(
					'post h-fit px-4 py-6 relative'
					// isModal && 'max-w-102 w-full mx-2 my-10'
				)}
			>
				<form onSubmit={handleSubmit}>
					<div className='flex justify-between items-start'>
						<div className='flex items-center gap-3'>
							<img className='profile' src={profile} alt='profile picture' />
							<div>
								<h1 className='title'>A B M Zubayer</h1>
								{/* {!isFocused ? null : ( */}
								{singleCommunity ? null : (
									<div ref={postCommunityRef} hidden>
										<span className='title text-sm font-DM-Sans font-medium text-light-muted dark:text-dark-muted'>
											Post to:{' '}
										</span>
										<select
											onClick={() => {
												// wrapperRef.current?.focus();
												// setFocused(true);
											}}
											name='community_id'
											className='cursor-pointer outline-none bg-transparent border border-light-muted/70 dark:border-dark-border rounded-full py-0.5 px-2 title text-sm font-DM-Sans font-medium text-light-muted dark:text-dark-muted max-w-fit'
										>
											<option defaultValue=''>Choose Community</option>
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
								{/* )} */}
							</div>
						</div>

						{/* {isModal ? (
						<button type='button' onClick={() => updatePostModal(false)}>
							<X className='h-8 w-8 p-1 hover:bg-light-muted/90 rounded-full text-dark-muted hover:text-light transition-colors' />
						</button>
					) : null} */}
					</div>

					<textarea
						ref={textAreaRef}
						onChange={onChange}
						value={text}
						cols={10}
						rows={isFocused ? 10 : 0}
						// name
						className={clsx(
							'title text-base h-fit w-full resize rounded-md bg-transparent font-medium outline-none transition-all mt-5',
							isFocused ? 'mb-10' : 'mb-0'
						)}
						placeholder='Your opinion...'
					></textarea>

					{!isFocused ? null : (
						<div className='absolute right-0 left-0 bottom-3 space-y-3'>
							<hr className='border border-light-border dark:border-dark-border' />

							<div className='flex justify-between items-stretch px-4'>
								<div className='flex items-center gap-4'>
									<button>
										<Image className='icon' />
									</button>
									<button>
										<MapPin className='icon' />
									</button>
									<button>
										<Smile className='icon' />
									</button>
								</div>
								<button
									className='title button text-sm text-light-text px-4 py-2 disabled:bg-nav-selected/80 disabled:text-light-text/80'
									disabled={!text}
								>
									Post
								</button>
							</div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default CreatePost;
