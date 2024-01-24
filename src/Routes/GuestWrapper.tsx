import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const GuestWrapper = ({ children }: { children: JSX.Element }) => {
	const navigate = useNavigate();
	const { state } = useAuth();

	useEffect(() => {
		if (state.isLoggedIn) navigate('/', { replace: true });
	}, [state.isLoggedIn, navigate]);

	return children;
};

export default GuestWrapper;
