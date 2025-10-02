import {Inject, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {RefundsModel} from "./entities/refunds.entity";
import {PaginationDto} from "../../common/dto/pagination.dto";
import {CreateRefundDto} from "./dtos/create-refund.dto";
import {REDIS_CLIENT, REDIS_KEYS} from "../redis/redis.constants";
import {RedisService} from "../redis/redis.service";
import {RefundDto} from "./dtos/refund.dto";
import {UpdateRefundDto} from "./dtos/update-refund.dto";
import {plainToInstance} from "class-transformer";
import {UserModel} from "../users/entities/users.entity";
import {TelegramUserExtended} from "../telegram/interfaces/user-telegram.interface";
import {UserRoles} from "../users/interfaces/users.interface";

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
		const newRefund = await this.refundsRepository.create(fields);
		const refundDto = this.toDto(newRefund);

		await this.redisService.set(REDIS_REFUND_KEY + refundDto.refundId, refundDto, 3600);

		return refundDto;
	}

	async updateRefundById(refundId: number, fields: UpdateRefundDto) {
		const refundFromDb = await this.refundsRepository.findByPk(refundId);

		if (!refundFromDb) throw new NotFoundException();

		await refundFromDb.update({...fields});

		const refundDto = this.toDto(refundFromDb);
		await this.redisService.set(REDIS_REFUND_KEY + refundDto.refundId, refundDto, 3600);

		return refundDto;
	}

	async getRefundOrdersByUserId(userId: number, params: PaginationDto) {
		const {page, order, sort, limit} = params;

		const refunds = await this.refundsRepository.findAll({
			limit: limit,
			offset: (page - 1) * limit,
			order: [
				[sort ?? "created_at", order ?? "desc"],
			],
			include: [{
				model: UserModel,
				where: {
					userId: userId,
				}
			}]
		})

		return refunds.map(refund => this.toDto(refund));
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

	async removeRefundById(refundId: number) {
		const refundFromDB = await this.refundsRepository.findByPk(refundId);

		if (!refundFromDB) throw new NotFoundException();

		await this.redisService.del(REDIS_REFUND_KEY + refundId);

		await refundFromDB.destroy()

		return 1;
	}

	async getRefundById(refundId: number, user: TelegramUserExtended) {
		let refundObject: RefundDto;
		const refundFromCache = await this.redisService.get<RefundDto>(REDIS_REFUND_KEY + refundId);

		if (!refundFromCache) {
			const refundFromDB = await this.refundsRepository.findByPk(refundId);
			if (!refundFromDB) throw new NotFoundException();

			refundObject = refundFromDB;
		} else {
			refundObject = refundFromCache;
		}

		if (refundObject.userId !== user.id && user.role !== UserRoles.ADMIN) throw new UnauthorizedException();

		return refundObject;
	}

	private toDto(refund: RefundsModel) {
		return plainToInstance(RefundDto, refund, {
			excludeExtraneousValues: true
		})
	}
}