export type PostActionRes = { message: string; post: { post_id: string } };
export type PostActionParams = { community_id: string; post_id: string };
export type CreateRulePayloadType = {
	title: FormDataEntryValue | null;
	body: FormDataEntryValue | null;
	community_id: string;
};

export type CreateRuleResultType = { message: string; rule: RuleType };

export type DeleteRuleResultType = {
	message: string;
	rule: { rule_id: string };
};

export type RuleType = {
	rule_id: string;
	title: string;
	body: string;
	// order: number;
	community_id: string;
	createdAt: string;
	updatedAt: string;
};

export type UpdateRulesOrderPayloadType = {
	community_id: string;
	rules: RuleType[];
};

export type UpdateRulesOrderResultType = {
	message: string;
	rules: RuleType[];
};
