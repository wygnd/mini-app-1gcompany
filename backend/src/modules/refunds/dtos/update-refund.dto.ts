import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class UpdateRefundDto {
	@ApiProperty({
		type: String,
		example: "OOO \"COMPANY NAME\"",
		description: "Company",
		required: false
	})
	@IsOptional()
	@IsString()
	organization: string;

	@ApiProperty({
		type: String,
		example: "Gogolya street",
		description: "Address",
		required: false
	})
	@IsOptional()
	@IsString()
	address: string;

	@ApiProperty({
		type: String,
		description: "Image url",
		required: false
	})
	@IsOptional()
	@IsString()
	attachmentUrl: string;

	@ApiProperty({
		type: String,
		example: "10 boxes",
		description: "Count product",
		required: false
	})
	@IsOptional()
	@IsString()
	countProduct: string;
}