import {Inject, Injectable} from "@nestjs/common";
import {RefundsModel} from "./entities/refunds.entity";
import {PaginationDto} from "../../common/dto/pagination.dto";

@Injectable()
export class RefundsService {

	constructor(
		@Inject('RefundsRepository')
		private readonly refundsRepository: typeof RefundsModel
	) {
	}


	async createRefundOrder() {

	}

	async getRefundOrders(params: PaginationDto) {
		const {page, order, sort, limit} = params;

		return await this.refundsRepository.findAll({
			limit: limit,
			offset: (page - 1) * limit,
			order: [
				[sort ?? "created_at", order ?? "desc"],
			]
		});
	}

}