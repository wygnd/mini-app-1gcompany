import {Optional} from "sequelize";

export interface IOrderAttributes {
	orderId: string;
	pickDate: number;
	pickType: string;
	pickAddress: string;
	product: string;
	provider: string;
	for: string;
	attachment: string;
}

export type IOrderCreationAttributes = Optional<IOrderAttributes, 'orderId'>;