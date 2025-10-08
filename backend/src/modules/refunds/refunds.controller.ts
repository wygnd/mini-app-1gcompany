import {
	Body,
	Controller, Delete,
	Get,
	HttpException,
	HttpStatus, Logger,
	Param,
	ParseIntPipe, Patch,
	Post,
	Query,
	Req, UploadedFile,
	UseGuards, UseInterceptors
} from "@nestjs/common";
import {RefundsService} from "./refunds.service";
import {CreateRefundDto} from "./dtos/create-refund.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ApiAuthorizationHeaderDecorator} from "../../common/decorators/api-authorization-header.decorator";
import {RolesGuard} from "../../common/guards/roles.guard";
import {RefundDto} from "./dtos/refund.dto";
import {ApiExceptions} from "../../common/decorators/api-exceptions.decorator";
import {RefundPaginationDto} from "./dtos/refund-pagination.dto";
import type {Request} from 'express';
import {UserRoles} from "../users/interfaces/users.interface";
import {Roles} from "../../common/decorators/roles.decorator";
import {UpdateRefundDto} from "./dtos/update-refund.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags("refunds")
@ApiAuthorizationHeaderDecorator()
@Controller('refunds')
export class RefundsController {
	private readonly logger = new Logger(RefundsController.name, {timestamp: true});

	constructor(
		private readonly refundsService: RefundsService,
	) {
	}

	@ApiOperation({summary: "Create refund"})
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Success',
		type: RefundDto
	})
	@ApiExceptions()
	@UseInterceptors(FileInterceptor('file'))
	@Post('create')
	async createRefund(
		@UploadedFile() file: Express.Multer.File,
		@Body() fields: CreateRefundDto,
		@Req() request: Request
	) {
		try {
			return await this.refundsService.createRefundOrder(fields, file, request.user);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation({summary: "Get refund list by user id"})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: [RefundDto]
	})
	@ApiExceptions()
	@Roles(UserRoles.ADMIN)
	@UseGuards(RolesGuard)
	@Get('/:userId')
	async getRefundsByUserId(@Query() queryParams: RefundPaginationDto, @Param('userId', ParseIntPipe) requestUserId: number) {
		try {
			return await this.refundsService.getRefundOrdersByUserId(requestUserId, queryParams);
		} catch (error) {
			throw error;
		}
	}

	@ApiOperation({summary: "Get refund list"})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: [RefundDto]
	})
	@ApiExceptions()
	@Roles(UserRoles.ADMIN)
	@UseGuards(RolesGuard)
	@Get('/all')
	async getRefundsAdmin(@Query() queryParams: RefundPaginationDto) {
		try {
			return await this.refundsService.getRefundOrders(queryParams);
		} catch (error) {
			throw error;
		}
	}

	@ApiOperation({summary: "Get refund list"})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: [RefundDto]
	})
	@ApiExceptions()
	@Get('/me')
	async getRefunds(@Query() queryParams: RefundPaginationDto, @Req() request: Request) {
		try {
			return await this.refundsService.getRefundOrdersByUserId(request.user.id, queryParams);
		} catch (error) {
			throw error;
		}
	}

	@ApiOperation({summary: "Remove refund"})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: Number,
	})
	@ApiExceptions()
	@Roles(UserRoles.ADMIN)
	@UseGuards(RolesGuard)
	@Delete("/:refundId")
	async removeRefund(@Param('refundId', ParseIntPipe) refundId: number) {
		try {
			return await this.refundsService.removeRefundById(refundId);
		} catch (error) {
			throw error;
		}
	}

	@ApiOperation({summary: "Update refund"})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: RefundDto
	})
	@ApiExceptions()
	@Patch('/:refundId')
	async updateRefund(@Param('refundId', ParseIntPipe) refundId: number, @Body() fields: UpdateRefundDto) {
		try {
			return await this.refundsService.updateRefundById(refundId, fields);
		} catch (error) {
			throw error;
		}
	}

	@ApiOperation({summary: "Get refund by id", description: "Allow for all users"})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: RefundDto
	})
	@ApiExceptions()
	@Get("/me/:refundId")
	async getRefundById(@Param('refundId', ParseIntPipe) refundId: number, @Req() request: Request) {
		try {
			return await this.refundsService.getRefundById(refundId, request.user);
		} catch (error) {
			throw error;
		}
	}
}