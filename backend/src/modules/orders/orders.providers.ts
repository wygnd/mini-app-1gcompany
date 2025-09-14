import {OrdersModel} from "./enitites/orders.entity";

export const ordersProviders = [
	{
		provide: "OrdersRepository",
		useValue: OrdersModel
	}
];