import axios from 'axios';
import localStorageAdapter from "../adapters/localStorageAdapter";

export const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : '';
const $api = axios.create({
    validateStatus: function (status) {
        return status == 200 || status == 201;
    },
    withCredentials: true,
    baseURL: `${API_URL}`,
});

$api.interceptors.request.use(async config => {
    config.headers["Authorization"] = localStorageAdapter.getItem('token');
    return config;
});

$api.interceptors.response.use(
    config => {
        return config;
    },
    async error => {
        if (error.response.status == 401) {
            localStorageAdapter.removeItem('token');
            window.location = '/login'
        }
        throw error;
    },
);

export default $api;
