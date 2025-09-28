import {ConfigModule} from "@nestjs/config";
import databaseConfig from "../common/conifg/database.config";
import constantsConfig from "../common/conifg/app.config";
import redisConfig from "../common/conifg/redis.config";
import {Module} from "@nestjs/common";


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig, constantsConfig, redisConfig]
		}),
	]
})
export class ConfigAppModule {
}