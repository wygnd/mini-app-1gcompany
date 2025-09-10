import {ConfigService} from "@nestjs/config";
import {Provider} from "@nestjs/common";
import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import {UserModel} from "../users/entities/users.entity";


export const databaseProviders = [
	{
		isGlobal: true,
		provide: "SEQUELIZE",
		useFactory: async (configService: ConfigService) => {
			const sequelize = new Sequelize(configService.get<SequelizeOptions>('database'));
			sequelize.addModels([UserModel]);
			await sequelize.sync();
			return sequelize;
		},
		inject: [ConfigService],
	}
];