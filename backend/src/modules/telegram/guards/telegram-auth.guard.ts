import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {TelegramAuthService} from "../telegram-auth.service";
import {CustomRequest} from "../../../common/interfaces/custom-request.interface";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../../../common/decorators/public.decorator";

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

		const request = context.switchToHttp().getRequest<CustomRequest>();
		const [authType, initData] = (request.headers['authorization'] || "").split(' ');
		if (authType !== 'tma') throw new UnauthorizedException('Authorization required');
		console.log("Check working guard", authType, initData);
		if (!initData) throw new UnauthorizedException("Invalid init data");

		const [user, error] = this.telegramService.validateData(initData);

		if (!user) throw new UnauthorizedException(error);

		request.user = user;
		return true;
	}
}