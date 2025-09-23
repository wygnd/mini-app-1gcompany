import axios from "axios";
import {API_URL} from "@/utils/contants.ts";
import {retrieveLaunchParams} from '@telegram-apps/sdk';

const $API = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

$API.interceptors.request.use(config => {
	const {initDataRaw} = retrieveLaunchParams();

	if (initDataRaw) config.headers.Authorization = `tma ${initDataRaw}`;

	return config;
})

export {$API};
