import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import {ApiExcludeController} from "@nestjs/swagger";
import {RolesGuard} from "./common/guards/roles.guard";
import {Roles} from "./common/decorators/roles.decorator";
import {UserRoles} from "./modules/users/interfaces/users.interface";
import {TelegramService} from "./modules/telegram/telegram.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {Public} from "./common/decorators/public.decorator";

@ApiExcludeController()
@UseGuards(RolesGuard)
@Controller()
export class AppController {
	constructor(private readonly telegramService: TelegramService) {
	}

	// @Roles(UserRoles.ADMIN)
	@Public()
	@UseInterceptors(FileInterceptor('file'))
	@Get('/test-admin')
	testForAdmins(@UploadedFile() file: Express.Multer.File) {
		try {
			return this.telegramService.uploadFile(file);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}
