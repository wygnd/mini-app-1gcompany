import {REDIS_CLIENT} from "./redis.constants";
import {ConfigService} from "@nestjs/config";
import Redis from "ioredis";
import {redisOptions} from "./redis.config-factory";

export const redisProviders = [
	{
		provide: REDIS_CLIENT,
		useFactory: async (configService: ConfigService) => {
			// const client = new Redis(redisOptions(configService));
			const redisConnectUrl = configService.get<string>('redisUrl');
			if(!redisConnectUrl) throw new Error("Redis URL doesn't exist");
			const client = new Redis(redisConnectUrl);
			client.on("error", e => console.error(`REDIS: Error connecting: ${e}`));
			try {
				await client?.connect?.();
			} catch (error) {
				console.error(`REDIS: Failed to connect: ${error}`);
			}
			return client;
		},
		inject: [ConfigService]
	}
]