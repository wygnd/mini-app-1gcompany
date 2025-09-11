import {
	Body,
	Controller,
	Get, HttpException, HttpStatus,
	Param,
	ParseIntPipe, Patch,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards
} from "@nestjs/common";
import {OrdersService} from "./orders.service";
import {UserRoles} from "../users/interfaces/users.interface";
import {Roles} from "../auth/roles.decorator";
import {AuthGuard} from "../auth/auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import type {CustomRequest} from "../../common/interfaces/custom-request.interface";
import {GetOrdersDto} from "./dtos/get-orders.dto";
import {CreateOrderDto} from "./dtos/create-order.dto";
import {UpdateOrderFields} from "./dtos/update-order.fields";

@UseGuards(AuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
	constructor(
		private readonly ordersService: OrdersService
	){}

	@Get("/private")
	async getUserOrders(@Req() request: CustomRequest) {
		try {
			return await this.ordersService.getOrdersByUserId(request.user.id);
		} catch (error) {
			throw error;
		}
	}

	@Get("/all")
	@Roles(UserRoles.ADMIN)
	async getOrders(@Body() body: GetOrdersDto) {
		try {
			return await this.ordersService.getOrders(body.page);
		} catch (error) {
			throw error;
		}
	}

	@Get("/:order_id")
	async getOrderById(@Param('order_id', ParseIntPipe) order_id: number) {
		try {
			return await this.ordersService.getOrderById(order_id);
		} catch(error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Post()
	async createOrder(@Body() createOrderFields: CreateOrderDto, @Req() request: CustomRequest) {
		try {
			return await this.ordersService.createOrder(createOrderFields, request.user.id);
		} catch(error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Roles(UserRoles.ADMIN)
	@Patch()
	async updateOrder(@Body() updateOrderFields: UpdateOrderFields, @Req() request: CustomRequest) {
		try {
			return await this.ordersService.updateOrder(updateOrderFields, request.user.id);
		} catch(error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}