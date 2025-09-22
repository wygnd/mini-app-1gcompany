import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {TelegramUser} from "./interfaces/user-telegram.interface";
import {parse, validate} from "@tma.js/init-data-node";

@Injectable()
export class TelegramAuthService {
	private readonly telegramToken: string;

	constructor(
		private readonly configService: ConfigService,
	) {
		this.telegramToken = configService.get<string>("telegramToken") ?? "";
	}

	public validateData(initData: string): null | TelegramUser {
		try {
			validate(initData, this.telegramToken);
			return this.parseData(initData);
		} catch (error) {
			return null;
		}
	}

	public parseData(initData: string): null | TelegramUser {
		return parse(initData).user || null;
	}
}