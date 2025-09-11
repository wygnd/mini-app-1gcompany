import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {OrdersModel} from "./enitites/orders.entity";
import {UserModel} from "../users/entities/users.entity";
import {CreateOrderDto} from "./dtos/create-order.dto";
import {UpdateOrderFields} from "./dtos/update-order.fields";

@Injectable()
export class OrdersService {
	constructor(
		@Inject("OrdersRepository")
		private readonly ordersRepository: typeof OrdersModel
	) {}

	async getOrdersByUserId(userId: number) {
		return await this.ordersRepository.findAll({
			where: {
				userId: userId,
			},
			include: [UserModel],
		})
	}

	async getOrders(page: number, limit: number = 20) {
		return await this.ordersRepository.findAll({
			limit: limit,
			offset: (page - 1) * limit,
		});
	}

	async getOrderById(orderId: number) {
		const orderFromDB = await this.ordersRepository.findByPk(orderId);

		if(!orderFromDB) throw new NotFoundException("Order not found");

		return orderFromDB;
	}

	async createOrder(orderFields: CreateOrderDto, userId: number) {
		return await this.ordersRepository.create({...orderFields, userId: userId});
	}

	async updateOrder(orderFields: UpdateOrderFields, userId: number) {
			const order = await this.ordersRepository.findByPk(orderFields.orderId);

			if(!order) throw new NotFoundException("Order not found");

			return await order.update({...orderFields, userId: userId});
	}
}