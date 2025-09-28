import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from "./modules/users/users.module";
import {OrdersModule} from "./modules/orders/orders.module";
import {TelegramModule} from "./modules/telegram/telegram.module";
import {APP_GUARD} from "@nestjs/core";
import {TelegramAuthGuard} from "./modules/telegram/guards/telegram-auth.guard";
import {RedisModule} from "./modules/redis/redis.module";
import {ConfigAppModule} from "./config/config.module";

@Module({
	imports: [TelegramModule, ConfigAppModule, OrdersModule, UsersModule, RedisModule],
	controllers: [AppController],
	providers: [AppService,
		{
			provide: APP_GUARD,
			useValue: TelegramAuthGuard
		}],
})
export class AppModule {
}
