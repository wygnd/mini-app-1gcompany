import {Optional} from "sequelize";

export enum OrdersStatus {
	WAITING_PICKUP = "waiting for pick up",
	WAITING_TZ = 'waiting tz',
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