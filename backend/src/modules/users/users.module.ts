import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {DatabaseModule} from "../database/database.module";
import {usersProviders} from "./users.providers";
import {TelegramAuthService} from "../auth/telegram-auth.service";

@Module({
	imports: [DatabaseModule],
	controllers: [UsersController],
	providers: [...usersProviders, UsersService, TelegramAuthService],
})
export class UsersModule {}