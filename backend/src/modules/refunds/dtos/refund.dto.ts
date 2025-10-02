import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class RefundDto {
	@ApiProperty({
		type: Number,
		example: 1,
		description: "Unique entity identifier"
	})
	refundId: number;

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
		description: "Image url"
	})
	@IsNotEmpty()
	@IsString()
	attachmentUrl: string;

	@ApiProperty({
		type: String,
		example: "10 boxes",
		description: "Count product"
	})
	@IsNotEmpty()
	@IsString()
	countProduct: string;

	@IsNotEmpty()
	@IsNumber()
	userId: number;
}