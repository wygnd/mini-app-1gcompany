import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {TelegramAuthService} from "../telegram-auth.service";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../../../common/decorators/public.decorator";
import * as express from 'express';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly telegramService: TelegramAuthService
	) {
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		]);

		if (isPublic) return true;

		const request = context.switchToHttp().getRequest<express.Request>();
		const [authType, initData] = (request.headers['authorization'] || "").split(' ');
		if (authType !== 'tma') throw new UnauthorizedException('Authorization required');

		if (!initData) throw new UnauthorizedException("Invalid init data");

		const [user, error] = this.telegramService.validateData(initData);

		if (!user) throw new UnauthorizedException(error);

		request.user = user;
		return true;
	}
}