import {Controller, Get, NotFoundException, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiExcludeController} from "@nestjs/swagger";
import {TelegramAuthGuard} from "./modules/telegram/guards/telegram-auth.guard";
import {RolesGuard} from "./common/guards/roles.guard";

@UseGuards(TelegramAuthGuard, RolesGuard)
@ApiExcludeController()
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get('/test')
	testForAllUsers() {
	}

	@Get('/test-admin')
	testForAdmins() {
	}
}
