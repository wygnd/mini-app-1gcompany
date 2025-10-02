import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {RefundsService} from "./refunds.service";
import {refundsProviders} from "./refunds.providers";
import {RefundsController} from "./refunds.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [RefundsController],
	providers: [...refundsProviders, RefundsService],
})
export class RefundsModule {}