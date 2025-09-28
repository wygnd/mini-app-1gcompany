import {RedisOptions} from "ioredis";
import {ConfigService} from "@nestjs/config";
import {redisRetryStrategy} from "./redis.retry-strategy";


export const redisOptions = (configService: ConfigService): RedisOptions => {
	let totalRetryDuration = 0;

	return {
		host: configService.get<string>('redis.host'),
		port: configService.get<number>('redis.port') || 6379,
		username: configService.get<string>('redis.username'),
		password: configService.get<string>('redis.password'),
		showFriendlyErrorStack: true,
		lazyConnect: true,
		commandTimeout: 1000,
		retryStrategy: (times) => {
			const {delay, retryDuration} = redisRetryStrategy(times, totalRetryDuration);
			totalRetryDuration = retryDuration;
			return delay;
		},
	}

}