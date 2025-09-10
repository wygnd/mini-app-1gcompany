import {UserModel} from "./entities/users.entity";
import {Inject, Injectable} from "@nestjs/common";
import {TelegramUser} from "./interfaces/user-telegram.interface";

@Injectable()
export class UsersService {
	constructor(
		@Inject("UserRepository")
		private readonly userRepository: typeof UserModel
	) {}

	// todo: Check user in database. If not exists create user
	public async findOrCreateUser(user: TelegramUser) {

	}
}