import {  Module} from "@nestjs/common";
import {TelegramAuthService} from "./telegram-auth.service";
import {telegramProviders} from "./telegram.providers";
import {UsersModule} from "../users/users.module";


@Module({
	imports: [UsersModule],
	providers: [...telegramProviders, TelegramAuthService],
	exports: [TelegramAuthService],
})
export class TelegramModule {
}