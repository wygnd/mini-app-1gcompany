import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {TelegramAuthService} from "../telegram-auth.service";
import {CustomRequest} from "../../../common/interfaces/custom-request.interface";

@Injectable()
export class TelegramAuthGuard implements CanActivate {
	constructor(private readonly telegramService: TelegramAuthService) {
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
			const request = context.switchToHttp().getRequest<CustomRequest>();
			const [authType, initData] = (request.headers['authorization'] || "").split(' ');
			console.log(authType, initData);
			if(authType !== 'tma') throw new UnauthorizedException('Authorization required');

			if (!initData) throw new UnauthorizedException("Invalid init data");

			const user = this.telegramService.validateData(initData);

			if(!user) throw new UnauthorizedException("Invalid validation user");

			request.user = user;
			return true;
	}
}