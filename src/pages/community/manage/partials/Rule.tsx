import clsx from 'clsx';
import { DebouncedFunc } from 'lodash';
import { GripVertical, MoreHorizontal, Trash2 } from 'lucide-react';
import type { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import ClickableDropdown from '../../../../components/ClickableDropdown';
import { useDeleteRuleMutation } from '../../../../features/authority/authorityApi';
import { ItemTypes } from '../../../../types/custom';

interface Item {
	id: string;
	originalIndex: number;
}

type RuleProps = {
	id: string;
	index: number;
	title: string;
	text: string;
	moveRule: (id: string, atIndex: number) => void;
	findRule: (id: string) => { index: number };
	debounce: DebouncedFunc<() => void>;
};

const Rule: FC<RuleProps> = ({
	id,
	index,
	text,
	title,
	findRule,
	moveRule,
	debounce,
}) => {
	const [deletRule] = useDeleteRuleMutation();
	const params = useParams();

	const originalIndex = findRule(id).index;
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: ItemTypes.RULE,
			item: { id, originalIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			end: (item, monitor) => {
				// console.log(item);
				const { id: droppedId, originalIndex } = item;
				const didDrop = monitor.didDrop();
				if (!didDrop) {
					moveRule(droppedId, originalIndex);
				}
				debounce();
			},
		}),
		[id, originalIndex, moveRule]
	);

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

	const handleDeleteRule = () => {
		if (confirm('Are you sure! You want to delete this?')) {
			toast.promise(
				deletRule({ community_id: params.id!, rule_id: id }).unwrap(),
				{
					loading: 'Deleting...',
					success: 'Rule successfully deleted.',
					error: 'Could not delete.',
				}
			);
		}
	};

	return (
		<div
			ref={(node) => drag(drop(node))}
			className={clsx('w-full flex justify-between items-start py-3 relative', {
				'bg-dark-primary': isDragging,
			})}
		>
			<div className='flex items-stretch justify-start gap-4'>
				<div className='flex items-start gap-2'>
					<GripVertical className='text-light-lighter' strokeWidth={1.5} />
					<span className='title text-light-lighter font-DM-Sans'>{index}</span>
				</div>
				<div>
					<div className='flex items-stretch gap-2'>
						<h1 className='title text-light-primary font-DM-Sans'>{title}</h1>
					</div>
					<p className='title text-sm text-dark-muted font-DM-Sans'>{text}</p>
				</div>
			</div>

			<ClickableDropdown
				button={
					<button type='button'>
						<MoreHorizontal className='dark:text-light-lighter dark:hover:text-light-primary transition-colors' />
					</button>
				}
			>
				<div className='dark:bg-dark-primary px-1 absolute right-3 top-8 flex flex-col border dark:border-dark-border rounded-xl z-10'>
					<button
						onClick={handleDeleteRule}
						className='flex items-center gap-3 py-2 px-3 rounded-lg my-1.5 hover:bg-normal-primary/20 cursor-pointer transition-all'
						type='button'
					>
						<Trash2 className='text-red' strokeWidth={1.5} />
						<h3 className='title text-sm font-normal text-red'>Delete Rule</h3>
					</button>
				</div>
			</ClickableDropdown>
		</div>
	);
};

export default Rule;
