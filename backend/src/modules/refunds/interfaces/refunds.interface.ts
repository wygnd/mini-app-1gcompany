import {Optional} from "sequelize";


export interface IRefundAttributes {
	refundId: number;
	organization: string;
	address: string;
	attachmentId: string;
	attachmentUrl: string;
	countProduct: string;
	userId: number;
}

export type IRefundCreationAttributes = Optional<IRefundAttributes, 'refundId'>;