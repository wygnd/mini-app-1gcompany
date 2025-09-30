import {  Module} from "@nestjs/common";
import {TelegramAuthService} from "./telegram-auth.service";
import {telegramProviders} from "./telegram.providers";


@Module({
	providers: [...telegramProviders, TelegramAuthService],
	exports: [TelegramAuthService],
})
export class TelegramModule {
}