import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {TelegramAuthService} from "./telegram-auth.service";
import {CustomRequest} from "../../common/interfaces/custom-request.interface";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly telegramService: TelegramAuthService) {
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
			const request = context.switchToHttp().getRequest<CustomRequest>();
			const initData = request.body.InitData as string;

			if (!initData) throw new UnauthorizedException("Invalid init data");

			const user = this.telegramService.validateData(initData);

			if(!user) throw new UnauthorizedException("Invalid validation user");

			request.user = user;
			return true;
	}
}