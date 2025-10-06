import {CanActivate, ExecutionContext, Injectable, Logger, LoggerService, UnauthorizedException} from "@nestjs/common";
import {TelegramAuthService} from "../telegram-auth.service";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../../../common/decorators/public.decorator";
import type {Request} from 'express';
import {UsersService} from "../../users/users.service";

@Injectable()
export class TelegramAuthGuard implements CanActivate {
	private readonly logger = new Logger(TelegramAuthGuard.name, {timestamp: true});

	constructor(
		private readonly reflector: Reflector,
		private readonly telegramService: TelegramAuthService,
		private readonly usersService: UsersService,
	) {
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		]);

		if (isPublic) return true;

		const request = context.switchToHttp().getRequest<Request>();
		const [authType, initData] = (request.headers['authorization'] || "").split(' ');
		if (authType !== 'tma') {
			this.logger.error('Invalid auth');
			throw new UnauthorizedException('Authorization required');
		}

		if (!initData) {
			this.logger.error('Invalid init data');
			throw new UnauthorizedException("Invalid init data");
		}

		const user = this.telegramService.validateData(initData);

		if (!user) {
			this.logger.error('Error initialize user');
			throw new UnauthorizedException();
		}

		const userDto = await this.usersService.findOrCreateUser(user);

		request.user = {...user, role: userDto.role};
		return true;
	}
}