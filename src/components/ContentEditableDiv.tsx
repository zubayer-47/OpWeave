import React, { useEffect, useRef, useState } from 'react';

function ContentEditableDiv() {
	const [content, setContent] = useState('');
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (divRef.current) {
			divRef.current.textContent = content;
		}
	}, [content]);

	const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
		setContent(event.target.innerHTML);
	};

	console.log({ content });

	return (
		<div
			ref={divRef}
			contentEditable
			onInput={handleChange}
			style={{ border: '1px solid #ccc', padding: '8px', color: '#fff' }}
			// suppressContentEditableWarning={true} // Optional, see explanation below
		>
			{/* Avoid placing any children here */}
		</div>
	);
}

export default ContentEditableDiv;
