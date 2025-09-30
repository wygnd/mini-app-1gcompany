import {Body, Controller, HttpException, HttpStatus, Post} from "@nestjs/common";
import {RefundsService} from "./refunds.service";
import {CreateRefundDto} from "./dtos/create-refund.dto";


@Controller('refunds')
export class RefundsController {
	constructor(
		private readonly refundsService: RefundsService,
	) {
	}

	@Post('create')
	async createRefund(@Body() fields: CreateRefundDto) {
		try {
			return await this.refundsService.createRefundOrder(fields);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}