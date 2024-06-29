export const trunc = (text: string, len?: number) => {
	return len
		? text.length > len
			? text.split('').slice(0, len).join('') + '...'
			: text
		: text.split('').slice(0, len).join('');
};

export const debounce = <T extends (...args: any[]) => any>(
	func: T,
	waitFor: number
) => {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	const debounced = (...args: Parameters<T>) => {
		if (timeout !== null) {
			clearTimeout(timeout);
			timeout = null;
		}
		timeout = setTimeout(() => func(...args), waitFor);
	};

	return debounced as (...args: Parameters<T>) => ReturnType<T>;
};

export function formatTime(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return `${diffInSeconds} seconds ago`;
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minutes ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hours ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays === 1) {
		return '1 day ago';
	} else if (diffInDays < 7) {
		return `${diffInDays} days ago`;
	}

	// For dates more than a week ago, you can customize the format as needed.
	return date.toLocaleDateString(); // Default to local date string format for older dates
}
