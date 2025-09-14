import {Optional} from "sequelize";

export enum OrdersStatus {
	WAITING_PICKUP = "waiting_pickup",
	WAITING_TZ = 'waiting_tz',
	PENDING = "pending",
	SUCCESS = "success",
}

export interface IOrderAttributes {
	orderId: number;
	pickDate: number;
	pickType: string;
	pickAddress: string;
	product: string;
	provider: string;
	for: string;
	attachment: string;
	status: OrdersStatus
	userId: number;
}

export type IOrderCreationAttributes = Optional<IOrderAttributes, 'orderId'>;