import { Post } from '../features/post/types';

export type InputType = React.ChangeEvent<HTMLInputElement>;
export type FormHandler = React.FormEventHandler<HTMLFormElement>;
export type BooleanSetStateType = React.Dispatch<React.SetStateAction<boolean>>;

export interface Community {
	id: string;
	name: string;
	avatar: string;
	bio: string;
	createdAt: string;
}

export enum NavId {
	home = 'home',
	explore = 'explore',
	notification = 'notification',
	communities = 'communities',
	bookmarks = 'bookmarks',
	profile = 'profile',
}

export const ItemTypes = {
	RULE: 'rule',
	CARD: 'card',
};

export type PostStateType = {
	posts: Post[];
	hasMore: boolean;
	totalCount: number;
};
