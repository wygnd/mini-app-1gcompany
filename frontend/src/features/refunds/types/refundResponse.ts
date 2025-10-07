import {ApiResponse} from "@/types/apiResponse.ts";
import {RefundInterface} from "@/features/refunds/types/refunds.ts";

export interface RefundResponse extends ApiResponse {
	result: RefundInterface | null;
}