import {REDIS_CLIENT} from "./redis.constants";
import {ConfigService} from "@nestjs/config";
import Redis, {RedisOptions} from "ioredis";

export const redisProviders = [
	{
		provide: REDIS_CLIENT,
		useFactory: async (configService: ConfigService) => {
			const config = configService.get<RedisOptions>('redis');

			if(!config) throw new Error("Redis configuration doesn't exist");

			return new Redis(config);
		},
		inject: [ConfigService]
	}
]