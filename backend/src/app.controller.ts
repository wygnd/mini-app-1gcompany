import {
	Controller,
	UseGuards
} from '@nestjs/common';
import {ApiExcludeController} from "@nestjs/swagger";
import {RolesGuard} from "./common/guards/roles.guard";

@ApiExcludeController()
@UseGuards(RolesGuard)
@Controller()
export class AppController {
	constructor() {
	}
}
