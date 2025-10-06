import {
	Body, ClassSerializerInterceptor,
	Controller, Get,
	HttpStatus,
	Patch,
	Post,
	Req,
	UseInterceptors
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UserModel} from "./entities/users.entity";
import {ApiExceptions} from "../../common/decorators/api-exceptions.decorator";
import {ApiAuthorizationHeaderDecorator} from "../../common/decorators/api-authorization-header.decorator";
import type {Request} from 'express';

@ApiTags("Users")
@ApiAuthorizationHeaderDecorator()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService
	) {
	}

	@ApiOperation({summary: 'Try login user'})
	@ApiResponse({status: HttpStatus.OK, description: 'User login response', type: UserModel})
	@ApiExceptions()
	@Get('/login')
	async login(@Req() request: Request) {
		try {
			return await this.usersService.findOrCreateUser(request.user);
		} catch (error) {
			throw error;
		}
	}

	@ApiOperation({summary: 'Update user info'})
	@ApiResponse({status: HttpStatus.OK, description: 'User update response', type: UserModel})
	@ApiExceptions()
	@Patch('/update')
	async updateUser(@Body() userFields: UpdateUserDto, @Req() request: Request) {
		try {
			return await this.usersService.updateUser(userFields, request.user.id);
		} catch (error) {
			throw error;
		}
	}
}