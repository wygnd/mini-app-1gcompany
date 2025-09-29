import {IUserAttributes, UserRoles} from "../interfaces/users.interface";
import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class UserDto {
	@Expose()
	@ApiProperty({
		description: "User name",
		type: String,
		required: false,
		example: "Alex"
	})
	userId: number;

	@Expose()
	@ApiProperty({
		description: "Telegram unique identifier",
		type: Number,
		required: true,
		example: "eskjhkfb23986234jirhe496738987"
	})
	telegramId: number;

	@Expose()
	role: UserRoles;

	@Expose()
	name?: string;

	@Expose()
	@ApiProperty({
		description: "User phone",
		type: String,
		required: false,
		example: "+79246238129"
	})
	phone?: string;

	@Expose()
	@ApiProperty({
		description: "User organization",
		type: String,
		required: false,
		example: "OOO \"COMPANY NAME\""
	})
	organization?: string;

	@Expose()
	@ApiProperty({
		description: "Show notifications",
		type: Boolean,
		required: false,
		example: true
	})
	show_notifications: boolean;
}