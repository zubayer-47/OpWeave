import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { userLoggedIn, userLoggedOut } from '../features/auth/authSlice';
import { userApi } from '../features/user/userApi';

const useAuthCheck = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			const auth = JSON.parse(localStorage.getItem('auth') || '{}');

			if (auth?.access_token) {
				try {
					const user = await dispatch(
						userApi.endpoints.getUser.initiate()
					).unwrap();

					dispatch(
						userLoggedIn({
							access_token: auth.access_token,
							user,
						})
					);

					setIsLoading(false);
				} catch (error) {
					console.log(error, 'useAuthCheck');
				}
			} else {
				dispatch(userLoggedOut());
				setIsLoading(false);
			}
		})();
	}, [dispatch]);

	return isLoading;
};

export default useAuthCheck;
