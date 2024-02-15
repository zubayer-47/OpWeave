export const trunc = (text: string, len?: number) => {
	return len
		? text.length > len
			? text.split('').slice(0, len).join('') + '...'
			: text
		: text.split('').slice(0, len).join('');
};
