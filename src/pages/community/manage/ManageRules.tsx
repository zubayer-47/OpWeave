import { skipToken } from '@reduxjs/toolkit/query';
import _debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';
import { useUpdateRulesOrderMutation } from '../../../features/authority/authorityApi';
import { RuleType } from '../../../features/authority/types';
import { useGetCommunityRulesQuery } from '../../../features/community/communityApi';
import { ItemTypes } from '../../../types/custom';
import Rule from './partials/Rule';

// const Rules = [
// 	{
// 		rule_id: 'f5893072-3b04-47ca-9a0e-1e82f7dea650',
// 		title: 'Hey, Rules creation testing',
// 		body: 'Sapiente beatae amet sit. Est voluptas voluptatem quasi cumque rem fuga. Qui voluptates quis itaque numquam quia. Vero facilis aliquam architecto et sit recusandae molestiae soluta. A quia adipisci qui ipsa excepturi est commodi. Dolore fugit laudantium reprehenderit et.',
// 		order: 1,
// 		community_id: 'c07131dd-bc6a-4927-aa5f-a3374988698d',
// 		createdAt: '2024-06-05T01:59:26.336Z',
// 		updatedAt: '2024-06-05T01:59:26.336Z',
// 	},
// 	{
// 		rule_id: '94690a66-b8db-4f25-bb1f-2d830011d76c',
// 		title: 'Hey, Rules creation',
// 		body: 'Nam et dolorum iste. Quis blanditiis ut quo ipsum consequuntur id. Voluptas consequatur temporibus dolorem iusto similique explicabo quo. Aut commodi iste eos. Aut omnis nesciunt nihil aspernatur asperiores minus veritatis sed. Non aut distinctio nobis earum autem quidem aspernatur.',
// 		order: 2,
// 		community_id: 'c07131dd-bc6a-4927-aa5f-a3374988698d',
// 		createdAt: '2024-06-05T02:05:28.140Z',
// 		updatedAt: '2024-06-05T02:05:28.140Z',
// 	},
// 	{
// 		rule_id: '197e4328-5116-4ac0-8351-a7e8bb925188',
// 		title: 'New Title',
// 		body: 'In optio dolor explicabo. Tempora architecto quae rerum. Sint facilis ipsum esse corporis non eum. Nisi necessitatibus at sed distinctio illum illum recusandae labore quisquam. Velit quisquam minus.',
// 		order: 3,
// 		community_id: 'c07131dd-bc6a-4927-aa5f-a3374988698d',
// 		createdAt: '2024-06-05T02:16:33.584Z',
// 		updatedAt: '2024-06-05T02:16:33.584Z',
// 	},
// ];

const ManageRules = () => {
	const params = useParams();
	const { isLoading, refetch } = useGetCommunityRulesQuery(
		params.id || skipToken
	);
	const [updateRulesOrder] = useUpdateRulesOrderMutation();
	const [rules, setRules] = useState<RuleType[]>([]);

	useEffect(() => {
		refetch()
			.then((res) => {
				if (res.data) {
					console.log(structuredClone(res.data.rules));
					setRules(structuredClone(res.data.rules));
				}
				return;
			})
			.catch((err) => {
				console.log(err, '--> manageRules 55');
			});
	}, [refetch]);

	const updateRulesOrderDebounce = _debounce(() => {
		updateRulesOrder({ community_id: params.id!, rules });
	}, 2000);

	const findRule = useCallback(
		(id: string) => {
			const rule = rules.filter((r) => r.rule_id === id)[0];

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
			});

			clonedRules.forEach((rule, ind) => {
				rule.order = ind + 1;
			});

			setRules(clonedRules);
		},
		[findRule, rules, setRules]
	);

	const [, drop] = useDrop(() => ({ accept: ItemTypes.RULE }));

	return (
		<div className='flex justify-center'>
			<div className='max-w-lg flex flex-col gap-8 w-full justify-center items-center self-center'>
				{isLoading ? (
					<h1>Loading...</h1>
				) : (
					<>
						<div className='flex justify-between items-center w-full bg-dark-muted/20 p-3 rounded-lg shadow-md shadow-dark-active'>
							<h1 className='title text-2xl'>Community Rules</h1>
							<Button text='Create' size='small' />
						</div>
						<div
							className='bg-dark-muted/20 p-3 rounded-lg shadow-md shadow-dark-active divide-y divide-dark-muted'
							ref={drop}
						>
							{rules.map(({ rule_id, title, body, order }) => (
								<Rule
									key={rule_id}
									id={rule_id}
									index={order}
									title={title}
									text={body}
									moveRule={moveRule}
									findRule={findRule}
									debounce={updateRulesOrderDebounce}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ManageRules;
