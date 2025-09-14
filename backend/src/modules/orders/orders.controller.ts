import {
	Body,
	Controller,
	Get, HttpException, HttpStatus,
	Param,
	ParseIntPipe, Patch,
	Post, Query,
	Req,
	UseGuards
} from "@nestjs/common";
import {OrdersService} from "./orders.service";
import {UserRoles} from "../users/interfaces/users.interface";
import {Roles} from "../../common/decorators/roles.decorator";
import {TelegramAuthGuard} from "../telegram/guards/telegram-auth.guard";
import {RolesGuard} from "../../common/guards/roles.guard";
import type {CustomRequest} from "../../common/interfaces/custom-request.interface";
import {CreateOrderDto} from "./dtos/create-order.dto";
import {UpdateOrderFields} from "./dtos/update-order.fields";
import {ApiExtraModels, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {OrdersModel} from "./enitites/orders.entity";
import {ApiExceptions} from "../../common/decorators/api-exceptions.decorator";
import {ApiAuthorizationHeaderDecorator} from "../../common/decorators/api-authorization-header.decorator";
import {PaginatedResponseDto} from "../../common/dto/paginated-response.dto";
import {ApiPaginatedResponse} from "../../common/decorators/api-paginated-response.decorator";
import {OrdersPaginationDto} from "./dtos/pagination.dto";

@ApiExtraModels(OrdersModel, PaginatedResponseDto)
@ApiTags('Orders')
@ApiAuthorizationHeaderDecorator()
@UseGuards(TelegramAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
	constructor(
		private readonly ordersService: OrdersService
	){}

	@ApiOperation({ summary: 'Get orders by id', description: 'At most part need for clients' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: [OrdersModel]
	})
	@ApiExceptions()
	@Get("/private")
	async getUserOrders(@Query() queryParams: OrdersPaginationDto, @Req() request: CustomRequest) {
		try {
			return await this.ordersService.getOrdersByUserId(request.user.id, queryParams);
		} catch (error) {
			throw error;
		}
	}

	@ApiOperation({summary: "Get oll orders", description: "Ger all orders. Only administrators can request"})
	@ApiPaginatedResponse(OrdersModel)
	@ApiExceptions()
	@Get("/all")
	@Roles(UserRoles.ADMIN)
	async getOrders(@Query() queryParams: OrdersPaginationDto) {
		try {
			return await this.ordersService.getOrders(queryParams);
		} catch (error) {
			throw error;
		}
	}

	@ApiOperation({summary: "Get orders details by id"})
	@ApiResponse({status: HttpStatus.OK, description: 'Success', type: OrdersModel})
	@ApiExceptions()
	@Get("/:order_id")
	async getOrderById(@Param('order_id', ParseIntPipe) order_id: number) {
		try {
			return await this.ordersService.getOrderById(order_id);
		} catch(error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation({summary: "Create new orders"})
	@ApiResponse({status: HttpStatus.CREATED, description: 'Success', type: OrdersModel})
	@ApiExceptions()
	@Post("/create")
	async createOrder(@Body() createOrderFields: CreateOrderDto, @Req() request: CustomRequest) {
		try {
			return await this.ordersService.createOrder(createOrderFields, request.user.id);
		} catch(error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation({summary: "Update orders"})
	@ApiResponse({status: HttpStatus.OK, description: 'Success', type: OrdersModel })
	@ApiExceptions()
	@Roles(UserRoles.ADMIN)
	@Patch("/update")
	async updateOrder(@Body() updateOrderFields: UpdateOrderFields, @Req() request: CustomRequest) {
		try {
			return await this.ordersService.updateOrder(updateOrderFields, request.user.id);
		} catch(error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}