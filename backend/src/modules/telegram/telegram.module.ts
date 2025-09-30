import {Global, Module} from "@nestjs/common";
import {TelegramAuthService} from "./telegram-auth.service";
import {telegramProviders} from "./telegram.providers";


@Global()
@Module({
	providers: [TelegramAuthService],
	exports: [TelegramAuthService, ...telegramProviders],
})
export class TelegramModule {
}