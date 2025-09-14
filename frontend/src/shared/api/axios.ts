import {API_URL} from "../constants.ts";
import {retrieveLaunchParams} from "@telegram-apps/sdk";

const { initDataRaw } = retrieveLaunchParams();

export const $API = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'telegram-api-init-data': `tma ${initDataRaw}`,
	}
})