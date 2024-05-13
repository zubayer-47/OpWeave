import {
	ButtonHTMLAttributes,
	PropsWithChildren,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

interface Props extends PropsWithChildren {
	button: ReactElement<unknown, string> & { props: ButtonProps };
}

function ClickableDropdown({ children, button }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		// Function to close the dropdown if clicked outside
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='clickable-dropdown' ref={dropdownRef}>
			<button {...button.props} onClick={toggleDropdown} />

			{isOpen && <>{children}</>}
		</div>
	);
}

export default ClickableDropdown;
