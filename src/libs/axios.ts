import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URI}/v1`;

export default axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
