import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRefundDto {
	@ApiProperty({
		type: String,
		example: "OOO \"COMPANY NAME\"",
		description: "Company"
	})
	@IsNotEmpty()
	@IsString()
	organization: string;

	@ApiProperty({
		type: String,
		example: "Gogolya street",
		description: "Address"
	})
	@IsNotEmpty()
	@IsString()
	address: string;

	@ApiProperty({
		type: String,
		example: "10 boxes",
		description: "Count product"
	})
	@IsNotEmpty()
	@IsString()
	countProduct: string;
}