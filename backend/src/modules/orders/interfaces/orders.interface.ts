import {Optional} from "sequelize";

export interface IOrderAttributes {
	orderId: string;
	pickDate: string;
	pickType: string;
	pickAddress: string;
	product: string;
	provider: string;
	for: string;
	attachment: string;
}

export type IOrderCreationAttributes = Optional<IOrderAttributes, 'orderId'>;