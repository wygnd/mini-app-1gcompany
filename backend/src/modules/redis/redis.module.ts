import {Module} from "@nestjs/common";
import {redisProviders} from "./redis.providers";
import {REDIS_CLIENT} from "./redis.constants";

@Module({
	providers: [...redisProviders],
	exports: [REDIS_CLIENT],
})
export class RedisModule {}



// todo: https://peturgeorgievv.com/blog/create-redis-service-with-nestjs-use-in-every-project