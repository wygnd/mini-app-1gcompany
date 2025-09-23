import {UserModel} from "./entities/users.entity";
import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {TelegramUser} from "../telegram/interfaces/user-telegram.interface";
import {UserRoles} from "./interfaces/users.interface";
import {UpdateUserDto} from "./dtos/update-user.dto";

@Injectable()
export class UsersService {
	constructor(
		@Inject("UsersRepository")
		private readonly userRepository: typeof UserModel
	) {}

	public async findOrCreateUser(userData: TelegramUser) {
		console.log('Trying find user', userData);
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


	public async updateUser(userFields: UpdateUserDto, userId: number) {
			const userFromDB = await this.userRepository.findOne({
				where: {
					telegramId: userId
				}
			});

			if(!userFromDB) throw new NotFoundException("User not found");

			return await userFromDB.update({...userFields});
	}
}