import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import databaseConfig from "./common/conifg/database.config";
import constantsConfig from "./common/conifg/constants.config";
import {UsersModule} from "./modules/users/users.module";
import {OrdersModule} from "./modules/orders/orders.module";
import {TelegramModule} from "./modules/telegram/telegram.module";
import {APP_GUARD} from "@nestjs/core";
import {TelegramAuthGuard} from "./modules/telegram/guards/telegram-auth.guard";

@Module({
  imports: [TelegramModule,
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig, constantsConfig]
		}), OrdersModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService,
	  {
			provide: APP_GUARD,
		  useValue: TelegramAuthGuard
	  }],
})
export class AppModule {}
