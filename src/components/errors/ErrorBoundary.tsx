import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div className='flex justify-center items-center w-full min-h-screen bg-gray-200'>
					<p className='text-3xl italic text-gray-400'>
						Something went <span className='font-bold'>wrong</span>.
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
