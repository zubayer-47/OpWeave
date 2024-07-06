// CopyButton.tsx
import clsx from 'clsx';
import React, { useState } from 'react';

interface CopyButtonProps {
	url: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ url }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	};

	return (
		<div className='flex justify-between gap-2 items-stretch'>
			<p className='text-dark-muted bg-dark-border p-1 rounded-lg'>{url}</p>

			<button
				type='button'
				className={clsx(
					'text-dark-muted flex items-center gap-1',
					'bg-dark-primary border border-dark-border px-2 rounded-lg hover:bg-dark-border transition-colors',
					{
						'text-emerald-400': copied,
					}
				)}
				onClick={handleCopy}
			>
				{copied ? (
					<>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m4.5 12.75 6 6 9-13.5'
							/>
						</svg>

						<span>Copied</span>
					</>
				) : (
					<>
						<span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184'
								/>
							</svg>
						</span>

						<span>Copy</span>
					</>
				)}
			</button>
		</div>
	);
};

export default CopyButton;
