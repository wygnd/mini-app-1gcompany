import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {RefundsService} from "./refunds.service";
import {refundsProviders} from "./refunds.providers";

@Module({
	imports: [DatabaseModule],
	providers: [...refundsProviders, RefundsService],
})
export class RefundsModule {}