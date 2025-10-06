import {  Module} from "@nestjs/common";
import {TelegramAuthService} from "./telegram-auth.service";
import {telegramProviders} from "./telegram.providers";
import {UsersModule} from "../users/users.module";
import {TelegramService} from "./telegram.service";
import {HttpModule} from "@nestjs/axios";


@Module({
	imports: [UsersModule, HttpModule],
	providers: [...telegramProviders, TelegramAuthService, TelegramService],
	exports: [TelegramAuthService],
})
export class TelegramModule {
}