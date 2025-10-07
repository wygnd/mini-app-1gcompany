import {$API} from "@/http";
import {RefundInterface} from "@/features/refunds/types/refunds.ts";
import axios from 'axios';
import {ApiResponse} from "@/types/apiResponse.ts";

export const createRefund = async (body: FormData): Promise<ApiResponse<RefundInterface | null>> => {
	try {
		const {data} = await $API.post<RefundInterface>("/refunds/create", body, {
			headers: {"Content-Type": "multipart/form-data"}
		});
		return {result: data, error: null};
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return {result: null, error: err.response?.data?.message || err.message}
		}

		return {result: null, error: "Произошла непредвиденная ошибка"}
	}
}

export const getRefundList = async (): Promise<ApiResponse<RefundInterface[] | null>> => {
	try {
		const {data} = await $API.get<RefundInterface[]>("/refunds/list");

		return {result: data, error: null};
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return {result: null, error: err.response?.data?.message || err.message}
		}

		return {result: null, error: "Произошла непредвиденная ошибка"}
	}
}