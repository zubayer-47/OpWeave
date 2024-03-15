import { UserRight } from '../contexts/user/types';

export type InputType = React.ChangeEvent<HTMLInputElement>;
export type FormHandler = React.FormEventHandler<HTMLFormElement>;
export type BooleanSetStateType = React.Dispatch<React.SetStateAction<boolean>>;

export enum NavId {
	home = 'home',
	explore = 'explore',
	notification = 'notification',
	communities = 'communities',
	bookmarks = 'bookmarks',
	profile = 'profile',
}

export const permissions = {
	all: [UserRight.ADMIN, UserRight.MODER, UserRight.USER],
	user: UserRight.USER,
	mod: UserRight.MODER,
	free: UserRight.FREE,
};
