import { MoreHorizontal } from 'lucide-react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const HorizontalMore = (props: Props) => {
	return (
		<button {...props}>
			<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary' />
		</button>
	);
};

export default HorizontalMore;
