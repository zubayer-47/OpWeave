import React, { useState } from 'react';

interface CopyPostLinkProps {
	url: string;
}

const CopyPostLink: React.FC<CopyPostLinkProps> = ({ url }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	};

	return (
		<div className='relative'>
			<label htmlFor='npm-install-copy-button' className='sr-only'>
				Label
			</label>
			<input
				id='npm-install-copy-button'
				type='text'
				className='border dark:border-dark-border dark:text-dark-muted text-sm rounded-lg block w-full p-2.5 pe-10 dark:bg-dark-border'
				value={url}
				disabled
				readOnly
			/>

			<button
				onClick={handleCopy}
				className='absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center'
			>
				{copied ? (
					<span id='success-icon' className='items-center'>
						<svg
							className='w-3.5 h-3.5 dark:text-green'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 16 12'
						>
							<path
								stroke='currentColor'
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='2'
								d='M1 5.917 5.724 10.5 15 1.5'
							/>
						</svg>
					</span>
				) : (
					<span id='default-icon'>
						<svg
							className='w-3.5 h-3.5'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							viewBox='0 0 18 20'
						>
							<path d='M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z' />
						</svg>
					</span>
				)}
			</button>
		</div>
	);
};

export default CopyPostLink;
