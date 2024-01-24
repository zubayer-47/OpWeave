import { Dispatch, createContext, useEffect, useReducer } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import userReducer from './reducer';
import { initUserState } from './state';
import { UserActionType, UserStateType } from './types';
import { isAxiosError } from 'axios';

export const UserContext = createContext({
	state: {} as UserStateType,
	dispatch: {} as Dispatch<UserActionType>,
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const axiosPrivate = useAxiosPrivate();
	const [state, dispatch] = useReducer(userReducer, initUserState);

	useEffect(() => {
		const controller = new AbortController();
		const token = localStorage.getItem('access_token');
		if (token && !state.user) {
			(async () => {
				try {
					const user = await axiosPrivate.get('/ur');
					const resData = user?.data;
					dispatch({
						type: 'SET_AUTH',
						payload: resData,
						// {
						// 	user: resData,
						// 	accessToken: token,
						// 	notice: resData?.notice,
						// },
					});
				} catch (error: unknown) {
					if (isAxiosError(error)) {
						console.log(error.status);
						console.error(error.response);
						// Do something with this error...
					} else {
						console.error(error);
					}
				}
			})();
		}
		return () => {
			controller.abort();
		};
	}, [axiosPrivate, state.user]);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
