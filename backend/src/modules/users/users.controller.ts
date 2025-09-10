import {Body, Controller, Post} from "@nestjs/common";
import {UsersService} from "./users.service";
import {ApiTags} from "@nestjs/swagger";
import {TelegramAuthService} from "./telegram-auth.service";

@ApiTags("users")
@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly telegramService: TelegramAuthService,
	) {}

	@Post('/login')
	async login(@Body('initData') initData: string) {
		try {
			const userFromTelegram = this.telegramService.validateData(initData);

			return await this.usersService.findOrCreateUser(userFromTelegram);
		} catch(error) {
			throw error;
		}
	}
}