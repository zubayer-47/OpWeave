import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useMemo, useState } from 'react';
import { Gender } from '../features/auth/types';

type Props = {
	error?: FetchBaseQueryError | SerializedError;
};

type ErrorStateType = {
	fullname?: string;
	username?: string;
	password?: string;
	email?: string;
	gender?: Gender;
	[index: string]: string | undefined;
	// commonError: string | null;
};

export default function useAuthError({ error }: Props) {
	const [errState, setErrState] = useState<ErrorStateType>({});

	const errContent = useMemo(() => {
		if (error) {
			if ('status' in error) {
				// you can access all properties of `FetchBaseQueryError` here
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const err = 'error' in error ? error.error : (error.data as any);

				if (typeof err === 'object') {
					const possibleErrorProps = [
						'fullname',
						'username',
						'password',
						'email',
						'gender',
					];

					// Get the actual properties present in the error object
					const presentErrorProps = Object.keys(err).filter((prop) =>
						possibleErrorProps.includes(prop)
					);

					const obj: ErrorStateType = {};

					// Check if any of the possible error properties are present
					if (presentErrorProps.length > 0) {
						for (const prop of presentErrorProps) {
							obj[prop] = err[prop];
						}
					}

					setErrState((prev) => ({
						...prev,
						...obj,
					}));
				}

				return err?.message;
				// errorContent = err?.message;
			} else {
				return error?.message ? error.message : '';
			}
		}
	}, [error]);

	return [errState, errContent];
}
