import {RedisOptions} from "ioredis";


export default (): { redis: RedisOptions } => ({
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
		password: process.env.REDIS_PASSWORD,
	}
})