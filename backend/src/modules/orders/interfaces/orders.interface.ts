import {Optional} from "sequelize";

export interface IOrderAttributes {
	orderId: number;
	pickDate: number;
	pickType: string;
	pickAddress: string;
	product: string;
	provider: string;
	for: string;
	attachment: string;
	userId: number;
}

export type IOrderCreationAttributes = Optional<IOrderAttributes, 'orderId'>;