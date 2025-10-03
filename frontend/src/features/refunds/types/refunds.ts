export interface RefundInterface {
	refundId: number;
	title: string;
	organization: string;
	address: string;
	attachmentUrl: string;
	countProduct: string;
}

export interface RefundStore {
	refunds: RefundInterface[];
	setRefund: (items: RefundInterface[] | []) => void;
	add: (item: RefundInterface) => void;
}
