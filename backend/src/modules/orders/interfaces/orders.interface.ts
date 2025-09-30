import {Optional} from "sequelize";

export enum OrdersStatus {
	WAITING_CONFIRM = "waiting_confirm",
	WAITING_PICKUP = "waiting_pickup",
	PENDING = "pending",
	IN_PROCESS = "in_process",
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