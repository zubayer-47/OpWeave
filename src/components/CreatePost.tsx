import clsx from 'clsx';
import { Image, MapPin, Smile } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import profile from '../assets/profile.webp';
import { useGetUserCommunitiesQuery } from '../features/community/communityApi';
import { updateModal } from '../features/modal/modalSlice';
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
	const editableDivRef = useRef<HTMLDivElement>(null);

	const handleSubmit: FormHandler = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = {
			community_id: formData.get('community_id') || params.id!,
		};

		try {
			// const sanitizedContent = content.replace(/tw-\w+/g, ''); // Removes classes starting with "tw-"
			const sanitizedContent = content.replace(/-|--|---|tw-\w+/g, ''); // Removes classes starting with "tw-"
			console.log('content', sanitizedContent);

			await toast.promise(createPost({ ...data, payload: content }).unwrap(), {
				loading: 'post creating...',
				success: 'post successfully created',
				error: 'Could not create. ',
			});

			dispatch(updateModal());

			if (communityIdRef.current) {
				communityIdRef.current.value = '';
			}

			setContent('');
		} catch (error) {
			//
		}
	};

	const handleChange = (e: ContentEditableEvent) => {
		setContent(e.target.value);
	};

	return (
		<div tabIndex={0} className={clsx('post h-fit px-4 pt-6 relative')}>
			<form onSubmit={handleSubmit}>
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

				<ContentEditable
					innerRef={editableDivRef}
					html={content}
					className={clsx(
						'title text-base w-full resize rounded-md bg-transparent font-medium outline-none transition-all mt-5 h-40 overflow-y-auto scrollbar-thin scrollbar-track-dark-primary scrollbar-thumb-normal-primary'
					)}
					onChange={handleChange}
					data-placeholder='Write your thoughts...'
				/>

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
		</div>
	);
};

// import React from 'react';
// import ContentEditable from 'react-contenteditable';
// import ReactDOM from 'react-dom';
// import sanitizeHtml from 'sanitize-html';
// import './styles.css';

// class MyComponent extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			html: `<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`,
// 			editable: true,
// 		};
// 	}
// 	handleChange = (evt) => {
// 		this.setState({ html: evt.target.value });
// 	};

// 	sanitizeConf = {
// 		allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1'],
// 		allowedAttributes: { a: ['href'] },
// 	};

// 	sanitize = () => {
// 		this.setState({ html: sanitizeHtml(this.state.html, this.sanitizeConf) });
// 	};

// 	toggleEditable = () => {
// 		this.setState({ editable: !this.state.editable });
// 	};

// 	render = () => {
// 		return (
// 			<div>
// 				<h3>editable contents</h3>
// 				<ContentEditable
// 					className='editable'
// 					tagName='pre'
// 					html={this.state.html} // innerHTML of the editable div
// 					disabled={!this.state.editable} // use true to disable edition
// 					onChange={this.handleChange} // handle innerHTML change
// 					onBlur={this.sanitize}
// 				/>
// 				<h3>source</h3>
// 				<textarea
// 					className='editable'
// 					value={this.state.html}
// 					onChange={this.handleChange}
// 					onBlur={this.sanitize}
// 				/>
// 				<h3>actions</h3>
// 				<EditButton cmd='italic' />
// 				<EditButton cmd='bold' />
// 				<EditButton cmd='formatBlock' arg='h1' name='heading' />
// 				<EditButton
// 					cmd='createLink'
// 					arg='https://github.com/lovasoa/react-contenteditable'
// 					name='hyperlink'
// 				/>
// 				<button onClick={this.toggleEditable}>
// 					Make {this.state.editable ? 'readonly' : 'editable'}
// 				</button>
// 			</div>
// 		);
// 	};
// }

// function EditButton(props) {
// 	return (
// 		<button
// 			key={props.cmd}
// 			onMouseDown={(evt) => {
// 				evt.preventDefault(); // Avoids loosing focus from the editable area
// 				document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
// 			}}
// 		>
// 			{props.name || props.cmd}
// 		</button>
// 	);
// }

// const rootElement = document.getElementById('root');
// ReactDOM.render(<MyComponent />, rootElement);

export default CreatePost;
