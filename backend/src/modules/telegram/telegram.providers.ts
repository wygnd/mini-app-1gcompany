import {TelegramAuthGuard} from "./guards/telegram-auth.guard";
import {APP_GUARD} from "@nestjs/core";

export const telegramProviders = [
	{
		provide: APP_GUARD,
		useClass: TelegramAuthGuard,
	}
]