import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullScreenLoading from '../components/FullScreenLoading';
import { Unauthorized } from '../components/errors/NotFound';
import useAuth from '../hooks/useAuth';

type Props = {
	children: JSX.Element;
	authorized?: number[];
};

const PrivateWrapper: React.FC<Props> = ({ children, authorized }) => {
	const token = localStorage.getItem('access_token');
	const navigate = useNavigate();
	const { state } = useAuth();

	useEffect(() => {
		if (!token && !state.user) navigate('/login', { replace: true });
	}, [token, state.user, navigate]);

	if (state.authLoading && token) {
		return <FullScreenLoading />;
	}

	if (
		(authorized && authorized.includes(state.user?.rights as number)) ||
		!authorized
	) {
		return children;
	}
	return <Unauthorized />;
};

export default PrivateWrapper;
