import {UserModel} from "./entities/users.entity";
import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {TelegramUser} from "../telegram/interfaces/user-telegram.interface";
import {UserRoles} from "./interfaces/users.interface";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UserDto} from "./dtos/user.dto";
import {RedisService} from "../redis/redis.service";
import {REDIS_KEYS} from "../redis/redis.constants";

@Injectable()
export class UsersService {
	constructor(
		@Inject("UsersRepository")
		private readonly userRepository: typeof UserModel,
		private readonly redisService: RedisService
	) {
	}

	public async findOrCreateUser(userData: TelegramUser) {
		const cachedUser = this.redisService.get<UserDto>(REDIS_KEYS.user + userData.id);
		console.log(`CHECK USER FROM CACHE: `, cachedUser); // debug

		if (cachedUser) return cachedUser;

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

		return new UserDto(user);
	}


	public async updateUser(userFields: UpdateUserDto, userId: number) {
		const userFromDB = await this.userRepository.findOne({
			where: {
				telegramId: userId
			}
		});

		if (!userFromDB) throw new NotFoundException("User not found");

		return await userFromDB.update({...userFields});
	}
}