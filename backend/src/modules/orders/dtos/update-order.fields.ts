import {IOrderAttributes} from "../interfaces/orders.interface";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateOrderFields implements Partial<IOrderAttributes> {
	@IsNotEmpty()
	@IsNumber()
	orderId: number;

	@IsOptional()
	@IsNumber()
	pickDate?: number;

	@IsOptional()
	@IsString()
	pickType?: string;

	@IsOptional()
	@IsString()
	pickAddress?: string;

	@IsOptional()
	@IsString()
	product?: string;

	@IsOptional()
	@IsString()
	provider?: string;

	@IsOptional()
	@IsString()
	for?: string;

	@IsOptional()
	@IsString()
	attachment?: string;
}