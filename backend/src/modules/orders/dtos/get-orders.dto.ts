import {IsNotEmpty, IsNumber} from "class-validator";

export class GetOrdersDto {
	@IsNotEmpty()
	@IsNumber()
	page: number;

}