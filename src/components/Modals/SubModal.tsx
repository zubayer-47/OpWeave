import profile from '../../assets/profile.webp';

const SubModal = () => {
	return (
		<div className='absolute top-20 -left-16 w-full md:w-80 bg-subModal px-3 py-2.5 shadow-sub-modal rounded-2xl'>
			<div className='flex items-center gap-3 px-2 py-1'>
				<img className='profile' src={profile} alt='' />

				<div className='flex flex-col justify-start items-start'>
					<h1 className='title'>A B M Zubayer</h1>
					<span className='title text-sm text-dark-muted'>@zubayerjs</span>
				</div>
			</div>
		</div>
	);
};

export default SubModal;
