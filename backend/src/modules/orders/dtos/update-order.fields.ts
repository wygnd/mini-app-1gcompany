import {IOrderAttributes, OrdersStatus} from "../interfaces/orders.interface";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateOrderFields implements Partial<IOrderAttributes> {
	@ApiProperty({
		description: "Order ID",
		type: Number,
		example: 1,
		required: true
	})
	@IsNotEmpty()
	@IsNumber()
	orderId: number;

	@ApiProperty({
		description: "Date of pick",
		type: Number,
		required: false,
		example: 1757522685078
	})
	@IsOptional()
	@IsNumber()
	pickDate?: number;

	@ApiProperty({
		description: "kind of pick address",
		type: String,
		required: false,
		example: "Склад поставщика"
	})
	@IsOptional()
	@IsString()
	pickType?: string;

	@ApiProperty({
		description: "Address",
		type: String,
		required: false,
		example: "Mira street 40"
	})
	@IsOptional()
	@IsString()
	pickAddress?: string;

	@ApiProperty({
		description: "Count or weight product",
		type: String,
		required: false,
		example: "100 kg"
	})
	@IsOptional()
	@IsString()
	product?: string;

	@ApiProperty({
		description: "Provider's contacts",
		type: String,
		required: false,
		example: "tg.me/contacts"
	})
	@IsOptional()
	@IsString()
	provider?: string;

	@ApiProperty({
		description: "For who",
		type: String,
		required: false,
		example: "OOO \"COMPANY NAME\n"
	})
	@IsOptional()
	@IsString()
	for?: string;

	@ApiProperty({
		description: "File",
		type: String,
		required: false,
		example: "file id"
	})
	@IsOptional()
	@IsString()
	attachment?: string;
}