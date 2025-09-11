import {IOrderCreationAttributes} from "../interfaces/orders.interface";
import {Optional} from "sequelize";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateOrderDto implements Optional<IOrderCreationAttributes, 'userId'> {
	@IsNotEmpty()
	@IsNumber()
	pickDate: number;

	@IsNotEmpty()
	@IsString()
	pickType: string;

	@IsNotEmpty()
	@IsString()
	pickAddress: string;

	@IsNotEmpty()
	@IsString()
	product: string;

	@IsNotEmpty()
	@IsString()
	provider: string;

	@IsNotEmpty()
	@IsString()
	for: string;

	@IsOptional()
	@IsString()
	attachment: string;
}