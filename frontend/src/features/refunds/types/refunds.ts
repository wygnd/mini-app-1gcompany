export interface RefundInterface {
	refundId: number;
	title: string;
	organization: string;
	address: string;
	attachmentUrl: string;
	attachmentId: string;
	countProduct: string;
}

export interface RefundStore {
	refunds: RefundInterface[];
	setRefund: (items: RefundInterface[] | []) => void;
	add: (item: RefundInterface) => void;
}
