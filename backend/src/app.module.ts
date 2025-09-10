import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import databaseConfig from "./common/conifg/database.config";
import constantsConfig from "./common/conifg/constants.config";

@Module({
  imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig, constantsConfig]
		})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
