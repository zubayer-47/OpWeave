import { InternalAxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import axios, { axiosPrivate } from '../libs/axios';

const useAxiosPrivate = () => {
	const refresh = async () => {
		try {
			const res = await axios.get(`/ur/refresh`, {
				withCredentials: true,
			});
			localStorage.setItem('access_token', res?.data?.token);
			return res?.data?.token;
		} catch (error) {
			localStorage.removeItem('access_token');
			/**
			 * redirect window or state
			 */
			return error;
		}
	};

	useEffect(() => {
		const conf = (config: InternalAxiosRequestConfig) => {
			if (!config.headers?.Authorization && config.headers)
				config.headers.Authorization = `Bearer ${localStorage.getItem(
					'access_token'
				)}`;
			return config;
		};
		const reqErr = (error: unknown) => Promise.reject(error);

		const resErr = async (error: any) => {
			if (error.message !== 'canceled') {
				const prevRequest = error?.config;
				const { status, data } = error.response;
				if (status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return axiosPrivate(prevRequest);
				}
				if (!error?.response) {
					/**
					 * No server response!
					 */
					return Promise.reject();
				}
				return Promise.reject(error);
			}

			return null;
		};
		const reqIntercept = axiosPrivate.interceptors.request.use(conf, reqErr);
		const resIntercept = axiosPrivate.interceptors.response.use(
			(res) => res,
			resErr
		);

		return () => {
			axiosPrivate.interceptors.request.eject(reqIntercept);
			axiosPrivate.interceptors.response.eject(resIntercept);
		};
	}, [refresh]);

	return axiosPrivate;
};

export default useAxiosPrivate;
