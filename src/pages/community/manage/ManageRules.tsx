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
import ModalLayout from '../../../layouts/ModalLayouts/ModalLayout';
import { FormHandler, ItemTypes } from '../../../types/custom';
import Rule from './partials/Rule';

const ManageRules = () => {
	const params = useParams();
	const { isLoading, refetch } = useGetCommunityRulesQuery(
		params.id || skipToken
	);
	const [reorderRules] = useReorderRulesMutation();
	const [createRule] = useCreateRuleMutation();
	const [rules, setRules] = useState<RuleType[]>([]);
	const [isRuleCreationModalOpen, setRuleCreationModalOpen] = useState(false);
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

		setRuleCreationModalOpen(true);
	};

	return (
		<div className='flex justify-center'>
			<div className='max-w-lg flex flex-col gap-8 w-full justify-center items-center self-center'>
				{isLoading ? (
					<h1>Loading...</h1>
				) : (
					<>
						<div className='flex justify-between items-center w-full bg-dark-muted/20 p-3 rounded-lg shadow-md shadow-dark-active'>
							<h1 className='title text-lg md:text-2xl'>Community Rules</h1>
							<Button
								text='Create'
								size='small'
								onClick={() => setRuleCreationModalOpen(true)}
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
				isOpen={isRuleCreationModalOpen}
				onClose={() => setRuleCreationModalOpen(false)}
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
