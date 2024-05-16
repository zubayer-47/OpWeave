import clsx from 'clsx';
import { GripVertical } from 'lucide-react';
import type { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import HorizontalMore from '../../../../components/Buttons/HorizontalMore';
import { ItemTypes } from '../../../../types/custom';

interface Item {
	id: string;
	originalIndex: number;
}

type RuleProps = {
	id: string;
	title: string;
	text: string;
	moveRule: (id: string, atIndex: number) => void;
	findRule: (id: string) => { index: number };
};

const Rule: FC<RuleProps> = ({ id, text, title, findRule, moveRule }) => {
	const originalIndex = findRule(id).index;
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: ItemTypes.RULE,
			item: { id, originalIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			end: (item, monitor) => {
				console.log(item);
				const { id: droppedId, originalIndex } = item;
				const didDrop = monitor.didDrop();
				if (!didDrop) {
					moveRule(droppedId, originalIndex);
				}
			},
		}),
		[id, originalIndex, moveRule]
	);

	console.log('isDragging :', isDragging);

	const [, drop] = useDrop(
		() => ({
			accept: ItemTypes.RULE,
			hover({ id: draggedId }: Item) {
				if (draggedId !== id) {
					const { index: overIndex } = findRule(id);
					moveRule(draggedId, overIndex);
				}
			},
		}),
		[findRule, moveRule]
	);

	// const opacity = isDragging ? 0 : 1;

	return (
		<div
			ref={(node) => drag(drop(node))}
			className={clsx(
				'w-full flex justify-between items-start py-3'
				// `opacity-${opacity}`
			)}
		>
			<div className='flex items-stretch justify-start gap-4'>
				<div className='flex items-start gap-2'>
					<GripVertical className='text-light-lighter' strokeWidth={1.5} />
					<span className='title text-light-lighter font-DM-Sans'>{id}</span>
				</div>
				<div>
					<div className='flex items-stretch gap-2'>
						<h1 className='title text-light-primary font-DM-Sans'>{title}</h1>
					</div>
					<p className='title text-sm text-dark-muted font-DM-Sans'>{text}</p>
				</div>
			</div>

			<HorizontalMore />
		</div>
	);
};

export default Rule;
