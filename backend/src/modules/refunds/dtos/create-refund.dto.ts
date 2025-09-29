import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRefundDto {
	@ApiProperty({

	})
	@IsNotEmpty()
	@IsString()
	organization: string;

	@IsNotEmpty()
	@IsString()
	address: string;

	@IsNotEmpty()
	@IsString()
	attachmentUrl: string;

	@IsNotEmpty()
	@IsString()
	countProduct: string;
}