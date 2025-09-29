import {IUserAttributes, UserRoles} from "../interfaces/users.interface";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
	id: number;
	text: number;
	role: UserRoles;
	name?: string;
	phone?: string;
	organization?: string;

	constructor(partial: Partial<UserDto>) {
		Object.assign(this, partial);
	}
}