import axios from "axios";
import {API_URL} from "@/utils/contants.ts";
import {initDataRaw} from "@telegram-apps/sdk-react";

const $API = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

$API.interceptors.request.use(config => {
	const initData = initDataRaw();

	if (initData) config.headers.Authorization = `tma ${initData}`;

	return config;
})

export {$API};
