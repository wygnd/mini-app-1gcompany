import {ApiProperty} from "@nestjs/swagger";
import {IUserCreationAttributes} from "../interfaces/users.interface";
import {IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";

export class CreateUserDto implements IUserCreationAttributes {
	@ApiProperty({
		name: "User name",
		type: "string",
		example: "Andrew",
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({
		name: "Phone",
		type: "string",
		example: "+7123456789",
	})
	@IsNotEmpty()
	@IsPhoneNumber("RU")
	phone: string;

	@ApiProperty({
		name: "Organization name",
		type: "string",
		example: "OOO Company",
	})
	@IsNotEmpty()
	@IsString()
	organization: string;
}