import React, { useEffect, useRef, useState } from 'react';
import { isElement } from '../../helpers/richTextDiv';

function RichTextDiv() {
	const [content, setContent] = useState('');
	const divRef = useRef<HTMLDivElement>(null);

	// Handles Enter key for line breaks and basic text formatting
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			insertLineBreak();
		} else if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
			// Bold (Ctrl+B or Cmd+B)
			event.preventDefault();
			toggleBold();
		} else if (event.key === 'i' && (event.metaKey || event.ctrlKey)) {
			// Italic (Ctrl+I or Cmd+I)
			event.preventDefault();
			toggleItalic();
		}
	};

	// Inserts a line break at the current cursor position
	const insertLineBreak = () => {
		const selection = window.getSelection();
		if (selection) {
			const range = selection.getRangeAt(0);
			range.deleteContents();
			const lineBreakNode = document.createTextNode('\n');
			range.insertNode(lineBreakNode);

			// Move cursor to the next line
			range.setStartAfter(lineBreakNode); // Only one parameter needed
			range.collapse(true);
			selection.removeAllRanges();
			selection.addRange(range);

			updateContent();
		}
	};

	// Toggles bold formatting on the selected text
	const toggleBold = () => {
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			const selectedText = range.toString();
			const isBold = isSelectionFormat('strong');

			if (isBold) {
				// document.execCommand('removeFormat', false, 'b');
				unwrapTags(range, 'strong');
			} else {
				const boldTag = document.createElement('strong');
				boldTag.textContent = selectedText;
				range.deleteContents();
				range.insertNode(boldTag);
			}

			updateContent();
		}
	};

	// Toggles bold formatting on the selected text
	const toggleItalic = () => {
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			const selectedText = range.toString();
			const isItalic = isSelectionFormat('em');

			if (isItalic) {
				// document.execCommand('removeFormat', false, 'b');
				unwrapTags(range, 'em');
			} else {
				const italicTag = document.createElement('em');
				italicTag.textContent = selectedText;
				range.deleteContents();
				range.insertNode(italicTag);
			}

			updateContent();
		}
	};

	// Toggles italic formatting on the selected text
	// ... (similar logic to toggleBold, but using  or  tags)

	// Checks if the current selection has the specified format
	const isSelectionFormat = (tagName: string): boolean => {
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			const container = selection.getRangeAt(0).commonAncestorContainer;
			if (isElement(container)) {
				return container.closest(tagName) !== null;
			}
		}
		return false;
	};
	// Updates the content state with the latest HTML
	const updateContent = () => {
		if (divRef.current) {
			setContent(divRef.current.innerHTML.trim()); // Trim to remove extra spaces
		}
	};

	// Helper function to unwrap tags of a specific type
	const unwrapTags = (range: Range, tagName: string) => {
		const parentNode = range.commonAncestorContainer.parentNode;
		if (parentNode) {
			const tags = parentNode.querySelectorAll(tagName);
			tags.forEach((tag) => {
				const textNode = document.createTextNode(tag.textContent || '');
				tag.parentNode?.replaceChild(textNode, tag);
			});
		}
	};

	useEffect(() => {
		if (divRef.current) {
			divRef.current.focus();
		}
	}, []);

	return (
		<div
			ref={divRef}
			contentEditable
			onInput={updateContent}
			onKeyDown={handleKeyDown}
			style={{ border: '1px solid #ccc', padding: '8px' }} // Optional styling
		>
			{content} {/* Render the current content */}
			{/* Add more buttons or formatting controls within the div */}
		</div>
	);
}

export default RichTextDiv;
