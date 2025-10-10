import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {OrdersModel} from "./enitites/orders.entity";
import {UserModel} from "../users/entities/users.entity";
import {CreateOrderDto} from "./dtos/create-order.dto";
import {UpdateOrderFields} from "./dtos/update-order.fields";
import {PaginationDto} from "../../common/dto/pagination.dto";
import {FindOptions} from "sequelize";
import {PaginatedResponseDto} from "../../common/dto/paginated-response.dto";
import {OrderDto} from "./dtos/order.dto";
import {RefundsModel} from "../refunds/entities/refunds.entity";
import {plainToInstance} from "class-transformer";
import {RefundDto} from "../refunds/dtos/refund.dto";

@Injectable()
export class OrdersService {
	constructor(
		@Inject("OrdersRepository")
		private readonly ordersRepository: typeof OrdersModel
	) {
	}

	async getOrdersByUserId(userId: number, params: PaginationDto): Promise<PaginatedResponseDto<OrderDto>> {
		const {page = 1, limit = 10, sort = 'created_at', order = 'desc'} = params;

		const options: FindOptions = {
			where: {
				userId: userId,
			},
			limit: limit,
			offset: (page - 1) * limit,
			order: [
				[sort ?? "created_at", order ?? "desc"],
			],
			include: [UserModel],
		};

		const orders = await this.ordersRepository.findAll(options);
		const ordersTotalCount = await this.ordersRepository.count(options);

		return {
			page: page,
			limit: limit,
			total: ordersTotalCount,
			items: orders.map(order => this.toDto(order))
		}
	}

	async getOrders(params: PaginationDto): Promise<PaginatedResponseDto<OrderDto>> {
		let {page = 1, limit = 10, order = 'created_at', sort = 'desc'} = params;

		const options: FindOptions = {
			limit: limit,
			offset: (page - 1) * limit,
			order: [
				[sort ?? "created_at", order ?? "desc"],
			]
		};

		const orders = await this.ordersRepository.findAll(options);
		const ordersTotalCount = await this.ordersRepository.count(options);

		return {
			page: page,
			limit: limit,
			total: ordersTotalCount,
			items: orders.map(order => this.toDto(order))
		}
	}

	async getOrderById(orderId: number) {
		const orderFromDB = await this.ordersRepository.findByPk(orderId);

		if (!orderFromDB) throw new NotFoundException("Order not found");

		return orderFromDB;
	}

	async createOrder(orderFields: CreateOrderDto, userId: number) {
		return await this.ordersRepository.create({...orderFields, userId: userId});
	}

	async updateOrder(orderFields: UpdateOrderFields, userId: number) {
		const order = await this.ordersRepository.findByPk(orderFields.orderId);

		if (!order) throw new NotFoundException("Order not found");

		return await order.update({...orderFields, userId: userId});
	}

	private toDto(order: OrdersModel) {
		return plainToInstance(OrderDto, order, {
			excludeExtraneousValues: true
		})
	}
}