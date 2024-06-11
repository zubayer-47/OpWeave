import { useEffect, useState } from 'react';
import profile from '../assets/profile.webp';

interface Props {
	file: File;
	alt: string;
}

const ImagePreview = ({ src }: { src: string }) => {
	// const [previewUrl, setPreviewUrl] = useState<string>('');

	// // Generate preview when the component mounts
	// useEffect(() => {
	// 	const reader = new FileReader();
	// 	if (reader) {
	// 		reader.onloadend = () => {
	// 			if (reader.result) {
	// 				setPreviewUrl(reader.result.toString());
	// 			}
	// 		};
	// 		reader.readAsDataURL(file);
	// 	}
	// }, [file]);

	// console.log(previewUrl);

	return <img src={src} />;
};

export const ImagePreview2 = ({ alt, file }: Props) => {
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

	console.log(previewUrl);

	return <img src={profile} alt={alt} />;
};

export default ImagePreview;
