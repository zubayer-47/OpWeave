import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Props {
	file: File;
	alt: string;
}

const ImagePreview = ({ alt, file }: Props) => {
	const [previewUrl, setPreviewUrl] = useState<string>('');

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

	return <LazyLoadImage src={previewUrl} alt={alt} effect='blur' />;
};

export default ImagePreview;
