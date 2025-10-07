import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {RefundsService} from "./refunds.service";
import {refundsProviders} from "./refunds.providers";
import {RefundsController} from "./refunds.controller";
import {RedisModule} from "../redis/redis.module";
import {TelegramModule} from "../telegram/telegram.module";

@Module({
	imports: [DatabaseModule, RedisModule, TelegramModule],
	controllers: [RefundsController],
	providers: [...refundsProviders, RefundsService],
})
export class RefundsModule {}