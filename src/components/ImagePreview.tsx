import { useEffect, useState } from 'react';

interface ImagePreviewProps {
	file: File;
	alt: string;
}

const ImagePreview = ({ file, alt }: ImagePreviewProps) => {
	const [previewUrl, setPreviewUrl] = useState<string>('');

	// Generate preview when the component mounts
	useEffect(() => {
		const reader = new FileReader();
		if (reader) {
			reader.onloadend = () => {
				if (reader.result) {
					setPreviewUrl(reader.result.toString());
				}
			};
			reader.readAsDataURL(file);
		}
	}, [file]);

	return <img src={previewUrl} alt={alt} />;
};
export default ImagePreview;
