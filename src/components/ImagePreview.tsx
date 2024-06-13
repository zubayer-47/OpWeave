import { useEffect, useRef, useState } from 'react';

interface Props {
	file: File;
	alt: string;
}

const ImagePreview = ({ alt, file }: Props) => {
	const [previewUrl, setPreviewUrl] = useState<string>('');
	const imageRef = useRef<HTMLImageElement>(null);

	// Generate preview when the component mounts
	useEffect(() => {
		// console.log('run');
		const reader = new FileReader();
		if (reader) {
			reader.onloadend = () => {
				if (reader.result) {
					// console.log('reader.result:  ', reader.result);
					setPreviewUrl(reader.result.toString());
				}
			};
			reader.readAsDataURL(file);
		}
	}, [file]);

	console.log(previewUrl);

	return <img ref={imageRef} src={previewUrl} alt={alt} />;
};

export default ImagePreview;
