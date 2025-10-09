import {$API} from "@/shared/http";
import {RefundInterface} from "@/features/refunds/types/refunds.ts";
import axios from 'axios';
import {ApiResponse} from "@/shared/types/apiResponse.ts";
import {QueryParams} from "@/shared/types/queryParams.ts";

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

export const getRefundList = async (params?: QueryParams): Promise<ApiResponse<RefundInterface[] | null>> => {
	try {
		const {data} = await $API.get<RefundInterface[]>('/refunds/me', {
			params: {
				page: params?.page ?? 1,
				limit: params?.limit ?? 10,
				sort: params?.orderBy,
				order: params?.order
			}
		});

		return {result: data, error: null};
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return {result: null, error: err.response?.data?.message || err.message}
		}

		return {result: null, error: "Произошла непредвиденная ошибка"}
	}
}