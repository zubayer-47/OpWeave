import { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import Button from '../../../components/Buttons/Button';
import { ItemTypes } from '../../../types/custom';
import Rule from './partials/Rule';

const Rules = [
	{
		id: '1',
		index: 1,
		title: 'Be kind and courteous 1',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate optio dicta non sit eaque iusto, dolore nisi aut ',
	},
	{
		id: '2',
		index: 2,
		title: 'Be kind and courteous 2',
		text: 'Lorem ipsum dolor sit amet,',
	},
	{
		id: '3',
		index: 3,
		title: 'Be kind and courteous 3',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate optio dicta non sit eaque iusto, dolore nisi aut harum dignissimos necessitatibus',
	},
	{
		id: '4',
		index: 4,
		title: 'Be kind and courteous 4',
		text: 'adipisicing elit. Cupiditate optio dicta non sit eaque iusto, dolore nisi aut harum dignissimos necessitatibus',
	},
];

const ManageRules = () => {
	const [rules, setRules] = useState(Rules);
	// const rule = rules.find((r) => r.id === id);

	const findRule = useCallback(
		(id: string) => {
			const rule = rules.filter((r) => r.id === id)[0] as {
				id: string;
				index: number;
				title: string;
				text: string;
			};

			return {
				rule,
				index: rules.indexOf(rule),
			};
		},
		[rules]
	);

	const moveRule = useCallback(
		(id: string, atIndex: number) => {
			const { rule, index } = findRule(id);
			const clonedRules = [...rules];

			clonedRules.splice(index, 1);
			clonedRules.splice(atIndex, 0, {
				...rule,
				// index: atIndex + 1,
			});

			clonedRules.forEach((rule, ind) => {
				rule.index = ind + 1;
			});

			setRules(clonedRules);
		},
		[findRule, rules, setRules]
	);

	const [, drop] = useDrop(() => ({ accept: ItemTypes.RULE }));

	return (
		<div className='flex justify-center'>
			<div className='max-w-lg flex flex-col gap-8 w-full justify-center items-center self-center'>
				<div className='flex justify-between items-center w-full bg-dark-muted/20 p-3 rounded-lg shadow-md shadow-dark-active'>
					<h1 className='title text-2xl'>Community Rules</h1>
					<Button text='Create' size='small' />
				</div>
				<div
					className='bg-dark-muted/20 p-3 rounded-lg shadow-md shadow-dark-active divide-y divide-dark-muted'
					ref={drop}
				>
					{rules.map(({ id, text, index, title }) => (
						<Rule
							key={id}
							id={id}
							index={index}
							title={title}
							text={text}
							moveRule={moveRule}
							findRule={findRule}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ManageRules;
