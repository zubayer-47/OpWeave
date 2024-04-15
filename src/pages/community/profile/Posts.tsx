import clsx from 'clsx';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import Post from '../../../components/Post';
import ModalLayout from '../../../layouts/ModalLayouts/ModalLayout';
import OutletLayout from '../../../layouts/OutletLayout';

const Posts = () => {
	const [modal, setModal] = useState(false);
	const params = useParams();

	const postGridStyles = 'grid grid-cols-2 gap-20 px-20 mt-10';
	const basePostStyles = 'flex flex-col gap-10';
	const membersProfileStyles =
		'size-7 bg-dark-primary -ml-1 border dark:border-dark-border rounded-full';

	return (
		<div className={postGridStyles}>
			<div className={basePostStyles}>
				<Post />
				<Post />
				<Post />
			</div>
			<div>
				<OutletLayout title='About' sub='Developer Community'>
					<p
						className={clsx(
							'title',
							'text-sm',
							'font-normal',
							'font-Inter',
							'px-4'
						)}
					>
						Welcome to a vibrant community where passionate developers like you
						come together to learn, share, and build amazing things! A
						supportive environment: We believe in fostering a welcoming and
						inclusive space where everyone feels comfortable asking questions,
						sharing ideas, and seeking help. Diverse skill sets: Our members
						come from all backgrounds and experience levels, from seasoned
						professionals to enthusiastic beginners.
					</p>
					<div className='flex items-center gap-4 pl-5 pr-4 z-10'>
						<div className='flex items-center'>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span className={membersProfileStyles}></span>
							<span
								className={clsx(
									'title',
									'text-sm',
									'font-normal',
									'text-light-primary/70',
									'pl-1'
								)}
							>
								+200
							</span>
						</div>
						<Link
							to={`/communities/${params.id}?sec=members`}
							className={clsx(
								'text-blue-primary',
								'underline',
								'underline-offset-2',
								'font-Poppins',
								'text-sm'
							)}
						>
							Members
						</Link>
					</div>
					<div className='flex items-center gap-5 px-4 my-5'>
						<Button text='Create Post' onClick={() => setModal(true)} />
						<Button
							text='Info'
							className={clsx(
								'outlet_btn',
								'hover:opacity-70',
								'border-none',
								'px-12',
								'transition-all'
							)}
						/>
					</div>
				</OutletLayout>
			</div>

			<ModalLayout
				heading='Create Post'
				isOpen={modal}
				onClose={() => setModal(false)}
			>
				<h1 className='title'>Hello</h1>
			</ModalLayout>
		</div>
	);
};

export default Posts;
