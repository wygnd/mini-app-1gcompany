import {create} from "zustand";
import {RefundInterface, RefundStore} from "@/features/refunds/types/refunds.types.ts";

export const useRefundStore = create<RefundStore>((set, get) => ({
	refunds: [],
	setRefund: (items) => set({refunds: items}),
	add: (item: RefundInterface) => set({refunds: [...get().refunds, item]})
}));