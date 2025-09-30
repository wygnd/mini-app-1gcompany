import {Controller, Get, HttpStatus, Req, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiExcludeController} from "@nestjs/swagger";
import {RolesGuard} from "./common/guards/roles.guard";
import * as express from 'express';
import {Roles} from "./common/decorators/roles.decorator";
import {UserRoles} from "./modules/users/interfaces/users.interface";

@ApiExcludeController()
@UseGuards(RolesGuard)
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get('/test')
	testForAllUsers(@Req() request: express.Request) {
		return {
			status: HttpStatus.OK,
			message: "Welcome in endpoint for all users"
		}
	}

	@Roles(UserRoles.ADMIN)
	@Get('/test-admin')
	testForAdmins(@Req() request: express.Request) {
		return {
			status: HttpStatus.OK,
			message: "Welcome in endpoint for admin users"
		}
	}
}
