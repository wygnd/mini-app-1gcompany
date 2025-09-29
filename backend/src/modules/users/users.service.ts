import {UserModel} from "./entities/users.entity";
import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {TelegramUser} from "../telegram/interfaces/user-telegram.interface";
import {UserRoles} from "./interfaces/users.interface";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UserDto} from "./dtos/user.dto";
import {RedisService} from "../redis/redis.service";
import {REDIS_KEYS} from "../redis/redis.constants";
import {plainToInstance} from "class-transformer";

const {user: REDIS_KEY_USER} = REDIS_KEYS;

@Injectable()
export class UsersService {
	constructor(
		@Inject("UsersRepository")
		private readonly userRepository: typeof UserModel,
		private readonly redisService: RedisService
	) {
	}

	public async findOrCreateUser(userData: TelegramUser) {
		const cachedUser = await this.redisService.get<UserDto>(REDIS_KEYS.user + userData.id);

		if (cachedUser) return cachedUser;

		const [user, _] = await this.userRepository.findOrCreate({
			where: {
				telegramId: userData.id
			},
			defaults: {
				telegramId: userData.id,
				name: userData.first_name,
				role: UserRoles.USER,
				show_notifications: true
			}
		});

		const userDto = this.toUserDto(user);
		await this.redisService.set<UserDto>(REDIS_KEY_USER + userDto.telegramId, userDto, 28800);

		return userDto;
	}

	public async updateUser(userFields: UpdateUserDto, userId: number) {
		const userFromDB = await this.userRepository.findOne({
			where: {
				telegramId: userId
			}
		});

		if (!userFromDB) throw new NotFoundException("User not found");

		await userFromDB.update({...userFields});
		const userDto = this.toUserDto(userFromDB);
		await this.redisService.set<UserDto>(REDIS_KEY_USER + userDto.telegramId, userDto, 28800);

		return userDto;
	}

	private toUserDto(user: UserModel) {
		return plainToInstance(UserDto, user, {
			excludeExtraneousValues: true
		})
	}
}