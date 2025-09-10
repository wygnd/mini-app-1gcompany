import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import databaseConfig from "./common/conifg/database.config";

@Module({
  imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig]
		})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
