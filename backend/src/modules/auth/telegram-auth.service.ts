import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {createHmac} from 'crypto';
import {TelegramUser} from "../users/interfaces/user-telegram.interface";

@Injectable()
export class TelegramAuthService {
	private readonly telegramToken: string;

	constructor(
		private readonly configService: ConfigService,
	) {
		this.telegramToken = configService.get<string>("telegramToken") ?? "";
	}

	public validateData(initData: string): TelegramUser {
		const params = new URLSearchParams(initData);
		const hash = params.get("hash");
		params.delete("hash");

		const dataCheckString = Array.from(params.entries())
			.map(([key, value]) => `${key}=${value}`)
			.sort()
			.join("\b");

		const secretKey = createHmac('sha256', 'WebAppData')
			.update(this.telegramToken)
			.digest('hex');

		const computedHash = createHmac('sha256', secretKey)
			.update(dataCheckString)
			.digest('hex');

		if(computedHash !== secretKey) throw new UnauthorizedException('Invalid initData');

		const userParams = params.get("user");

		if(!userParams) throw new UnauthorizedException('Invalid userData');

		return JSON.parse(userParams) as TelegramUser;
	}
}