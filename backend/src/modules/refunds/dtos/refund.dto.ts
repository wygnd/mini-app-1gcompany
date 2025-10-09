import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Expose} from "class-transformer";

export class RefundDto {
	@ApiProperty({
		type: Number,
		example: 1,
		description: "Unique entity identifier"
	})
	@Expose()
	refundId: number;

	@ApiProperty({
		type: String,
		example: "Заявка на возврат #235234",
		description: "Refund title"
	})
	@Expose()
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({
		type: String,
		example: "OOO \"COMPANY NAME\"",
		description: "Company"
	})
	@Expose()
	@IsNotEmpty()
	@IsString()
	organization: string;

	@ApiProperty({
		type: String,
		example: "Gogolya street",
		description: "Address"
	})
	@Expose()
	@IsNotEmpty()
	@IsString()
	address: string;

	@ApiProperty({
		type: String,
		description: "Image url"
	})
	@Expose()
	@IsOptional()
	@IsString()
	attachmentUrl: string;

	@ApiProperty({
		type: String,
		description: "Image id"
	})
	@Expose()
	@IsNotEmpty()
	@IsString()
	attachmentId: string;

	@ApiProperty({
		type: String,
		example: "10 boxes",
		description: "Count product"
	})
	@Expose()
	@IsNotEmpty()
	@IsString()
	countProduct: string;

	@IsNotEmpty()
	@IsNumber()
	userId: number;
}