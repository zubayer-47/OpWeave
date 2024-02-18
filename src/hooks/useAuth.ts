import { isAxiosError } from 'axios';
import { useCallback, useContext } from 'react';
import { UserContext } from '../contexts/user/Provider';
import axios from '../libs/axios';

type RegisterProps = {
	username: string;
	fullname: string;
	email: string;
	password: string;
};

export default function useAuth() {
	const context = useContext(UserContext);

	if (!context) throw new Error('useAuth must be used within a UserProvider');

	const { dispatch } = context;

	const login = useCallback(
		async (username: string, password: string, signal?: AbortSignal) => {
			dispatch({ type: 'AUTH_LOADING', payload: true });

			try {
				const res = await axios.post(
					`/auth/signin`,
					{ username, password },
					{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true,
						signal,
					}
				);

				const resData = res?.data;

				localStorage.setItem('access_token', resData?.token);
				dispatch({
					type: 'SET_AUTH',
					payload: resData,
				});

				console.log(resData);
			} catch (error) {
				console.error(error);
				if (isAxiosError(error)) {
					const message = error.response?.data?.message;

					dispatch({ type: 'AUTH_ERROR', payload: message });
				}
			} finally {
				console.log('login finally');
				dispatch({ type: 'AUTH_LOADING' });
			}
		},
		[dispatch]
	);

	const register = useCallback(
		async (credentials: RegisterProps) => {
			dispatch({ type: 'AUTH_LOADING', payload: true });

			try {
				const res = await axios.post(`/auth/signup`, credentials, {
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				});

				const resData = res?.data;

				localStorage.setItem('access_token', resData?.token);
				dispatch({
					type: 'SET_AUTH',
					payload: resData,
				});
			} catch (error) {
				console.error(error);
				if (isAxiosError(error)) {
					const message = error.response?.data;

					console.log(error.response?.data);

					dispatch({ type: 'AUTH_ERROR', payload: message });
				}
			} finally {
				console.log('finally');
				dispatch({ type: 'AUTH_LOADING' });
			}
		},
		[dispatch]
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const logout = useCallback(async () => {
		/**
		 * Loading window or state
		 */

		// try {
		// 	await axios.get(`/ur/logout`, {
		// 		headers: { 'Content-Type': 'application/json' },
		// 		withCredentials: true,
		// 	});
		// 	/**
		// 	 * Success window or state
		// 	 */
		// } catch (error) {
		// 	/**
		// 	 * Handle Errors
		// 	 */
		// }
		localStorage.removeItem('access_token');
		dispatch({ type: 'REM_AUTH' });
		/**
		 * Redirect login page / home page
		 */
	}, [dispatch]);

	return { ...context, login, logout, register };
}
