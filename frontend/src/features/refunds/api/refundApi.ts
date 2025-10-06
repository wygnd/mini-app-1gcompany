import {$API} from "@/http";
import {RefundInterface} from "@/features/refunds/types/refunds.ts";

export const createRefund = async (body: FormData) => {
	try {
		const {data} = await $API.post<RefundInterface>("/refunds/create", body);
		return data;
	} catch (error) {
		throw error;
	}
}
