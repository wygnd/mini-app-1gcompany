import {$API} from "@/http";
import {RefundInterface} from "@/features/refunds/types/refunds.ts";
import {RefundResponse} from "@/features/refunds/types/refundResponse.ts";
import axios from 'axios';

export const createRefund = async (body: FormData): Promise<RefundResponse> => {
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
