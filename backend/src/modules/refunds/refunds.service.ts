import {HttpStatus, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {RefundsModel} from "./entities/refunds.entity";
import {PaginationDto} from "../../common/dto/pagination.dto";
import {CreateRefundDto} from "./dtos/create-refund.dto";
import {REDIS_CLIENT, REDIS_KEYS} from "../redis/redis.constants";
import {RedisService} from "../redis/redis.service";
import {RefundDto} from "./dtos/refund.dto";
import {UpdateRefundDto} from "./dtos/update-refund.dto";
import {plainToInstance} from "class-transformer";

const {refund: REDIS_REFUND_KEY} = REDIS_KEYS;

@Injectable()
export class RefundsService {

	constructor(
		@Inject('RefundsRepository')
		private readonly refundsRepository: typeof RefundsModel,
		@Inject(REDIS_CLIENT)
		private readonly redisService: RedisService
	) {
	}


	async createRefundOrder(fields: CreateRefundDto) {
		return await this.refundsRepository.create(fields);
	}

	async changeRefund(refundId: number, fields: UpdateRefundDto) {
		const refundFromDb = await this.refundsRepository.findByPk(refundId);

		if(!refundFromDb) throw new NotFoundException();

		await refundFromDb.update({...fields});
		return this.toDto(refundFromDb);
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

	async removeRefundBuId(refundId: number) {
		 const refundFromDB = await this.refundsRepository.findByPk(refundId);

		 if(!refundFromDB) throw new NotFoundException();

		 this.redisService.del(REDIS_REFUND_KEY);

		 return await refundFromDB.destroy();
	}

	private toDto(refund: RefundsModel) {
		return plainToInstance(RefundDto, refund, {
			excludeExtraneousValues: true
		})
	}
}