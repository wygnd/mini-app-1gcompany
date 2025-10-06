import {$API} from "@/http";
import {RefundForm} from "@/features/refunds/types/createRefund.ts";
import {RefundInterface} from "@/features/refunds/types/refunds.ts";

export const createRefund = async (body: RefundForm) => {
	try {
		const {data} = await $API.post<RefundInterface>("/refunds/create", body);
		return data;
	} catch (error) {
		throw error;
	}
}
