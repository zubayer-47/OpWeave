import clsx from 'clsx';
import { Image, MapPin, Smile } from 'lucide-react';
import { ChangeEvent, FC, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useGetUserAssignedCommunitiesQuery } from '../features/community/communityApi';
import { updateModal } from '../features/modal/modalSlice';
import { useCreatePostMutation } from '../features/post/postApi';
import { FormHandler } from '../types/custom';
import { ImagePreview2 } from './ImagePreview';

interface Props {
	singleCommunity?: boolean;
}

type Content = {
	content: string;
	selectedFile?: File;
};

const CreatePost: FC<Props> = ({ singleCommunity }) => {
	const [postState, setPostState] = useState<Content>({ content: '' });
	// const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const { data, isLoading } = useGetUserAssignedCommunitiesQuery();
	const [createPost] = useCreatePostMutation();
	const communityIdRef = useRef<HTMLSelectElement | null>(null);
	const params = useParams();
	// const { data: profileData } = useGetUserProfileQuery(
	// 	params.userId! || skipToken
	// );

	const profileData = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	const handleSubmit: FormHandler = async (e) => {
		e.preventDefault();

		const reqFormData = new FormData();
		reqFormData.append(
			'post_image',
			postState.selectedFile ? postState.selectedFile : ''
		);
		reqFormData.append('content', postState.content);

		if (params?.id) {
			await toast.promise(
				createPost({
					community_id: params.id,
					formData: reqFormData,
				}).unwrap(),
				{
					loading: 'Post creating...',
					success: 'Post Created Successfully.',
					error: 'Post could not create.',
				}
			);

			setPostState({ content: '', selectedFile: undefined });
			dispatch(updateModal());

			return;
		}

		// const community_id = communityIdRef.current?.value;
		const formData = new FormData(e.currentTarget);

		await toast.promise(
			createPost({
				community_id: formData.get('community_id'),
				formData: reqFormData,
			}).unwrap(),
			{
				loading: 'Post creating...',
				success: 'Post Created Successfully.',
				error: 'Post could not create.',
			}
		);

		if (communityIdRef.current) {
			communityIdRef.current.value = '';
		}

		setPostState({ content: '', selectedFile: undefined });
	};

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setPostState((prev) => ({
			...prev,
			content: e.target.value,
		}));
	};

	const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target?.files) {
			const file = event.target.files[0];

			setPostState((prev) => ({
				...prev,
				selectedFile: file,
			}));
		}
	};

	let imgPre;

	if (postState.selectedFile?.name) {
		console.log(postState.selectedFile, '---true condition---');
		imgPre = (
			<ImagePreview2 file={postState.selectedFile} alt='Post Image Preview' />
		);
	} else {
		console.log(postState.selectedFile, '---false condition---');
		imgPre = <h1 className='title'>Nothing...</h1>;
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={clsx('post h-fit px-4 pt-6 relative')}
			// onFocus={() => console.log('focus')}
			// onBlur={() => console.log('blur')}
		>
			<div className='flex justify-between items-start'>
				<div className='flex items-center gap-3'>
					<img
						className='profile'
						src={profileData?.avatar}
						alt='profile picture'
					/>
					<div>
						<h1 className='title'>{profileData?.fullname}</h1>
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

			<textarea
				name='content'
				id='content'
				cols={30}
				rows={1}
				onFocus={(e) => {
					e.target.classList.add('bg-transparent/15');
					e.target.rows = 3;
				}}
				value={postState.content}
				onChange={handleChange}
				className={clsx(
					'title text-base w-full resize p-2 rounded-md bg-transparent font-medium outline-none transition-all mt-5 overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
				)}
				placeholder='Write your thoughts..'
			></textarea>

			{/* {postState.selectedFile ? (
				<ImagePreview2 file={postState.selectedFile} alt='Post Image Preview' />
			) : (
				<h1 className='title'>Nothing</h1>
			)} */}

			{imgPre}

			<div className='space-y-3 mt-3 mb-4'>
				<hr className='border-light-border dark:border-dark-border' />

				<div className='flex justify-between px-4'>
					<div className='flex items-center gap-4'>
						<label htmlFor='uploadPics'>
							<div className='inline-flex items-center bg-dark-hover rounded-lg  cursor-pointer'>
								<Image className='size-5 text-white stroke-white m-2' />
							</div>
							<input
								type='file'
								name='uploadPics'
								id='uploadPics'
								className='hidden'
								onChange={handleFile}
								accept='image/jpg, image/jpeg, image/png, image/webp'
							/>
						</label>
						<button
							type='button'
							className='inline-flex items-center bg-dark-hover rounded-lg  cursor-pointer'
						>
							<MapPin className='size-5 text-white stroke-white m-2' />
						</button>
						<button
							type='button'
							className='inline-flex items-center bg-dark-hover rounded-lg  cursor-pointer'
						>
							<Smile className='size-5 text-white stroke-white m-2' />
						</button>
					</div>
					<button
						className='title button text-sm text-light-text px-4 py-2 disabled:bg-nav-selected/50 disabled:text-light-text/80'
						disabled={!postState.content}
						type='submit'
					>
						Post
					</button>
				</div>
			</div>
		</form>
	);
};

export default CreatePost;
