import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
	title: string;
	sub?: string;
}

const OutletLayout = ({ title, sub, children }: Props) => {
	return (
		<div className='h-fit col-span-4 mx-10 my-10 border dark:border-dark-border rounded-3xl relative overflow-hidden -z-10'>
			<div className='absolute community_suggestions rounded-2xl inset-0 opacity-70'></div>

			<div className='relative flex flex-col justify-between'>
				<div className='px-4 py-5'>
					<h1 className='title text-xl'>{title}</h1>

					{sub ? <h2 className='muted'>{sub}</h2> : null}
				</div>

				<div className='flex flex-col gap-3.5'>{children}</div>
			</div>
		</div>
	);
};

export default OutletLayout;
