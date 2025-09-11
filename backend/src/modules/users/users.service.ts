import {UserModel} from "./entities/users.entity";
import {Inject, Injectable} from "@nestjs/common";
import {TelegramUser} from "./interfaces/user-telegram.interface";
import {UserRoles} from "./interfaces/users.interface";

@Injectable()
export class UsersService {
	constructor(
		@Inject("UsersRepository")
		private readonly userRepository: typeof UserModel
	) {}

	public async findOrCreateUser(userData: TelegramUser) {
		const [user, _] = await this.userRepository.findOrCreate({
			where: {
				telegramId: userData.id
			},
			defaults: {
				telegramId: userData.id,
				name: userData.first_name,
				role: UserRoles.USER
			}
		});

		return user;
	}
}