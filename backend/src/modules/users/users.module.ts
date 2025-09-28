import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {DatabaseModule} from "../database/database.module";
import {usersProviders} from "./users.providers";
import {RedisModule} from "../redis/redis.module";

@Module({
	imports: [DatabaseModule, RedisModule],
	controllers: [UsersController],
	providers: [...usersProviders, UsersService],
})
export class UsersModule {}