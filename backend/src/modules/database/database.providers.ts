import {ConfigService} from "@nestjs/config";
import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import {UserModel} from "../users/entities/users.entity";
import {OrdersModel} from "../orders/enitites/orders.entity";
import {RefundsModel} from "../refunds/entities/refunds.entity";


export const databaseProviders = [
	{
		isGlobal: true,
		provide: "SEQUELIZE",
		useFactory: async (configService: ConfigService) => {
			const sequelize = new Sequelize(configService.get<SequelizeOptions>('database'));
			sequelize.addModels([UserModel, OrdersModel, RefundsModel]);
			await sequelize.sync({
				force: true,
				alter: true
			});
			return sequelize;
		},
		inject: [ConfigService],
	}
];