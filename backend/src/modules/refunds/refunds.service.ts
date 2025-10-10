import {Inject, Injectable, Logger, NotFoundException, UnauthorizedException} from "@nestjs/common";
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
import {TelegramService} from "../telegram/telegram.service";
import {FindOptions} from "sequelize";
import {PaginatedResponseDto} from "../../common/dto/paginated-response.dto";

const {refund: REDIS_REFUND_KEY} = REDIS_KEYS;

@Injectable()
export class RefundsService {
	private readonly logger = new Logger(RefundsService.name, {timestamp: true});

	constructor(
		@Inject('RefundsRepository')
		private readonly refundsRepository: typeof RefundsModel,
		@Inject(REDIS_CLIENT)
		private readonly redisService: RedisService,
		private readonly telegramService: TelegramService,
	) {
	}

	async createRefundOrder(fields: CreateRefundDto, file: Express.Multer.File, user: TelegramUserExtended) {
		const {document} = await this.telegramService.uploadFile(file, user.id);
		this.logger.debug('upload file', document);
		const fileUrl = await this.telegramService.getFileLinkById(document.file_id);
		this.logger.debug('Get file link', fileUrl);

		const newRefund = await this.refundsRepository.create({
			...fields,
			title: "Заявка на возврат",
			userId: user.userId,
			attachmentUrl: fileUrl,
			attachmentId: document.file_id
		});
		this.logger.debug('After create new row in database', newRefund);
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

	async getRefundOrdersByUserId(userId: number, params: PaginationDto): Promise<PaginatedResponseDto<RefundDto>> {
		const {page = 1, limit = 10, order = 'desc', sort = 'created_at'} = params;

		const options: FindOptions = {
			limit: limit,
			offset: (page - 1) * limit,
			order: [
				[sort, order],
			],
			include: [{
				model: UserModel,
				where: {
					userId: userId,
				}
			}]
		};

		const refunds = await this.refundsRepository.findAll(options);
		const totalCount = await this.refundsRepository.count(options);

		return {
			page: page,
			limit: limit,
			total: totalCount,
			items: refunds.map(refund => this.toDto(refund))
		};
	}

	async getRefundOrders(params: PaginationDto) {
		const {page = 1, limit = 10, order = 'created_at', sort = 'desc'} = params;

		const options: FindOptions = {
			limit: limit,
			offset: (page - 1) * limit,
			order: [
				[sort, order],
			]
		};

		const refunds = await this.refundsRepository.findAll(options);
		const refundsTotalCount = await this.refundsRepository.count(options);

		return {
			page: page,
			limit: limit,
			total: refundsTotalCount,
			items: refunds.map(refund => this.toDto(refund))
		}

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

			refundObject = this.toDto(refundFromDB);
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