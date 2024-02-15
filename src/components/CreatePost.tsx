import { Image, MapPin, Smile, X } from 'lucide-react';
import {
	ChangeEventHandler,
	FC,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import profile from '../assets/profile.webp';
import useController from '../hooks/useController';

interface Props {
	isModal?: boolean;
}

const CreatePost: FC<Props> = ({ isModal = false }) => {
	const [isFocused, setFocused] = useState(false);
	const [text, setText] = useState('');

	const { closePostModal } = useController();

	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const postCommunityRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isModal) {
			setFocused(true);
			wrapperRef.current?.focus();
			console.log('first');
			if (postCommunityRef.current) postCommunityRef.current.hidden = false;
		}
	}, [isModal]);

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

	return (
		<div
			className={`${
				isModal ? 'fixed inset-0 bg-primary/75 flex justify-center' : ''
			}`}
		>
			{isModal ? (
				<button
					className='bg-transparent inset-0 absolute'
					onClick={closePostModal}
				></button>
			) : null}
			<div
				ref={wrapperRef}
				tabIndex={0}
				onFocus={onFocus}
				className={`post h-fit px-4 py-6 relative ${
					isModal ? 'max-w-102 w-full mx-2 my-10' : ''
				}`}
			>
				<div className='flex justify-between items-start'>
					<div className='flex items-center gap-3'>
						<img
							className='profile ring-2 ring-ring/80 ring-offset-2 ring-offset-primary'
							src={profile}
							alt='profile picture'
						/>
						<div>
							<h1 className='title '>A B M Zubayer</h1>
							{/* {!isFocused ? null : ( */}
							<div ref={postCommunityRef} hidden>
								<span className='title text-sm font-DM-Sans font-medium text-dark-muted'>
									Post to:{' '}
								</span>
								<select
									onClick={() => {
										// wrapperRef.current?.focus();
										// setFocused(true);
									}}
									name='community-selection'
									className='cursor-pointer outline-none bg-transparent border border-dark-border rounded-full py-0.5 px-2 title text-sm font-DM-Sans font-medium  text-dark-muted'
								>
									<option
										value='dev'
										className='title font-DM-Sans font-medium  text-dark-muted text-sm bg-primary'
										defaultValue='dev'
									>
										Dev community
									</option>
									<option
										value='vibe'
										className='title font-DM-Sans font-medium  text-dark-muted text-sm bg-primary'
									>
										Vibe community
									</option>
									<option
										value='news'
										className='title font-DM-Sans font-medium  text-dark-muted text-sm bg-primary'
									>
										News community
									</option>
									<option
										value='b'
										className='title font-DM-Sans font-medium  text-dark-muted text-sm bg-primary'
									>
										Bias community
									</option>
								</select>
							</div>
							{/* )} */}
						</div>
					</div>

					{isModal ? (
						<button type='button' onClick={closePostModal}>
							<X className='h-8 w-8 p-1 hover:bg-light-muted/90 rounded-full text-dark-muted hover:text-light transition-colors' />
						</button>
					) : null}
				</div>

				<textarea
					ref={textAreaRef}
					onChange={onChange}
					value={text}
					cols={10}
					rows={isFocused ? 10 : 0}
					className={`title text-base h-fit w-full resize rounded-md bg-transparent font-medium outline-none transition-all mt-5 ${
						isFocused ? 'mb-10' : 'mb-0'
					}`}
					placeholder='Your opinion...'
				></textarea>

				{!isFocused ? null : (
					<div className='absolute right-0 left-0 bottom-3 space-y-3'>
						<hr className='border-dark-border' />

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
								className='title button text-sm px-4 py-2 disabled:bg-ring/50 disabled:text-light/70'
								disabled
							>
								Post
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CreatePost;
