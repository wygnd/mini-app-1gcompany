import {IOrderCreationAttributes, OrdersStatus} from "../interfaces/orders.interface";
import {Optional} from "sequelize";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderDto implements Optional<IOrderCreationAttributes, 'userId'> {
	@ApiProperty({
		description: 'Date of pick',
		required: true,
		type: Number,
		example: 1757522685078
	})
	@IsNotEmpty()
	@IsNumber()
	pickDate: number;

	@ApiProperty({
		description: 'kind of pick address',
		required: true,
		type: String,
		example: "Склад поставщика"
	})
	@IsNotEmpty()
	@IsString()
	pickType: string;

	@ApiProperty({
		description: 'Address',
		required: true,
		type: String,
		example: "Mira street 40"
	})
	@IsNotEmpty()
	@IsString()
	pickAddress: string;

	@ApiProperty({
		description: "Weight product",
		type: String,
		required: true,
		example: "100 kg"
	})
	@IsNotEmpty()
	@IsString()
	product: string;

	@ApiProperty({
		description: "Provider's contacts",
		type: String,
		required: true,
		example: "@tgcontact"
	})
	@IsNotEmpty()
	@IsString()
	provider: string;

	@ApiProperty({
		description: "For who",
		type: String,
		required: true,
		example: "OOO \"COMPANY NAME\""
	})
	@IsNotEmpty()
	@IsString()
	for: string;

	@ApiProperty({
		description: "File",
		type: String,
		required: false,
		example: "file id"
	})
	@IsOptional()
	@IsString()
	attachment: string;

	@ApiProperty({
		description: "Order status",
		type: String,
		required: false,
		example: OrdersStatus.PENDING,
		default: OrdersStatus.WAITING_PICKUP
	})
	@IsOptional()
	@IsEnum(OrdersStatus)
	status: OrdersStatus;
}