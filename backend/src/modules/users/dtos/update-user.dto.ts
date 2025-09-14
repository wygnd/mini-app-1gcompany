import {IsBoolean, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
	@ApiProperty({
		description: "User name",
		type: String,
		required: false,
		example: "Alex"
	})
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty({
		description: "User phone",
		type: String,
		required: false,
		example: "+79246238129"
	})
	@IsOptional()
	@IsString()
	phone?: string;

	@ApiProperty({
		description: "User organization",
		type: String,
		required: false,
		example: "OOO \"COMPANY NAME\""
	})
	@IsOptional()
	@IsString()
	organization?: string;

	@IsOptional()
	@IsBoolean()
	show_notifications?: boolean;
}