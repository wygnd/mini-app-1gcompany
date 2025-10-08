import {Module} from "@nestjs/common";
import {TelegramAuthService} from "./telegram-auth.service";
import {telegramProviders} from "./telegram.providers";
import {UsersModule} from "../users/users.module";
import {TelegramService} from "./telegram.service";
import {ApiModule} from "../api/api.module";
import {TelegramClient} from "./telegram.client";


@Module({
	imports: [UsersModule, ApiModule],
	providers: [...telegramProviders, TelegramAuthService, TelegramService, TelegramClient],
	exports: [TelegramAuthService, TelegramService],
})
export class TelegramModule {
}