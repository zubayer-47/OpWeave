import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import _debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Button from '../../../components/Buttons/Button';
import Input from '../../../components/Inputs/Input';
import {
	useCreateRuleMutation,
	useReorderRulesMutation,
} from '../../../features/authority/authorityApi';
import { RuleType } from '../../../features/authority/types';
import { useGetCommunityRulesQuery } from '../../../features/community/communityApi';
import { updateModal } from '../../../features/modal/modalSlice';
import ModalLayout from '../../../layouts/ModalLayouts/ModalLayout';
import { FormHandler, ItemTypes } from '../../../types/custom';
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
	const [reorderRules] = useReorderRulesMutation();
	const [createRule] = useCreateRuleMutation();
	const [rules, setRules] = useState<RuleType[]>([]);
	const isVisibleModal = useAppSelector((state) => state.modal.isVisibleModal);
	const dispatch = useAppDispatch();

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

	const reorderRulesDebounce = _debounce(async () => {
		await reorderRules({ community_id: params.id!, rules }).unwrap();

		toast.success('Community rules reordered');
	}, 1000);

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

			setRules(clonedRules);
		},
		[findRule, rules, setRules]
	);

	const [, drop] = useDrop(() => ({ accept: ItemTypes.RULE }));

	const handleCreateRule: FormHandler = (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const data = {
			title: formData.get('title'),
			body: formData.get('body'),
		};

		toast.promise(createRule({ ...data, community_id: params.id! }).unwrap(), {
			loading: 'Creating...',
			success: 'Rule created.',
			error: "Couldn't create.",
		});

		dispatch(updateModal());
	};

	return (
		<div className='flex justify-center'>
			<div className='max-w-lg flex flex-col gap-8 w-full justify-center items-center self-center'>
				{isLoading ? (
					<h1>Loading...</h1>
				) : (
					<>
						<div className='flex justify-between items-center w-full bg-dark-muted/20 p-3 rounded-lg shadow-md shadow-dark-active'>
							<h1 className='title text-2xl'>Community Rules</h1>
							<Button
								text='Create'
								size='small'
								onClick={() => dispatch(updateModal())}
							/>
						</div>
						{!rules.length ? (
							<h1 className='title text-dark-muted'>No Rules Defined</h1>
						) : null}
						<ul
							className={clsx(
								'bg-dark-muted/20 rounded-lg shadow-md shadow-dark-active',
								'list-decimal text-light-primary/80 font-bold ps-10',
								{
									'p-2': !!rules.length,
								}
							)}
							ref={drop}
						>
							{!rules.length
								? null
								: rules.map(({ rule_id, title, body }) => (
										<Rule
											key={rule_id}
											id={rule_id}
											title={title}
											text={body}
											moveRule={moveRule}
											findRule={findRule}
											debounce={reorderRulesDebounce}
										/>
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  ))}
						</ul>
					</>
				)}
			</div>

			<ModalLayout
				heading='Create Rule'
				isOpen={isVisibleModal}
				onClose={() => dispatch(updateModal())}
			>
				<RuleCreationForm onSubmit={handleCreateRule} />
			</ModalLayout>
		</div>
	);
};

export default ManageRules;

type RuleCreationFormProps = {
	onSubmit: FormHandler;
};

function RuleCreationForm({ onSubmit }: RuleCreationFormProps) {
	return (
		<form action='' onSubmit={onSubmit} className='flex flex-col gap-5'>
			<Input
				hint='Title'
				type='text'
				name='title'
				inputClass='w-full border border-dark-border rounded-md px-3 py-2 bg-dark-primary text-light-primary focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-primary/50 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary dark:focus:border-dark-border'
				isRequired
				showLabel
				defaultValue=''
				// error={errState.}
			/>
			<div className={'flex flex-col'}>
				<label
					htmlFor='body'
					className="title text-sm font-Inter text-light-muted dark:text-dark-muted mb-2 after:content-['*'] after:text-red"
				>
					Body
				</label>
				<textarea
					id='body'
					className={
						'w-full text-sm border border-dark-border rounded-md px-3 py-2 bg-dark-primary text-light-primary dark:placeholder-dark-muted focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-primary/50 dark:focus:ring-offset-2 dark:focus:ring-offset-dark-primary'
					}
					name='body'
					placeholder='write a body'
					cols={30}
					rows={2}
				></textarea>
			</div>
			<Button
				text='Create Rule'
				className='!text-sm md:!text-base'
				type='submit'
				fullWidth
			/>
		</form>
	);
}
