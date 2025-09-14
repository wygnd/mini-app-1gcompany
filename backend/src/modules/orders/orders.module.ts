import {Module} from "@nestjs/common";
import {OrdersService} from "./orders.service";
import {OrdersController} from "./orders.controller";
import {DatabaseModule} from "../database/database.module";
import {ordersProviders} from "./orders.providers";

@Module({
	imports: [DatabaseModule],
	controllers: [OrdersController],
	providers: [...ordersProviders, OrdersService],
})
export class OrdersModule {}