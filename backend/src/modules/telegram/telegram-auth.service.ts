import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {TelegramUser} from "./interfaces/user-telegram.interface";
import {
	AuthDateInvalidError, ExpiredError,
	parse,
	SignatureInvalidError,
	SignatureMissingError,
	validate
} from "@tma.js/init-data-node";

@Injectable()
export class TelegramAuthService {
	private readonly telegramToken: string;

	constructor(
		private readonly configService: ConfigService,
	) {
		this.telegramToken = configService.get<string>("telegramToken") ?? "";
	}

	public validateData(initData: string): [null | TelegramUser, string] {
		try {
			validate(initData, this.telegramToken);
			return [this.parseData(initData), ""];
		} catch (error) {
			switch (true) {
				case error instanceof SignatureInvalidError:
					return [null, "Signature is invalid"];

					case error instanceof AuthDateInvalidError:
						return [null, "Auth date is empty or not found"];

					case error instanceof SignatureMissingError:
						return [null, "Hash is empty or not found"];

					case error instanceof ExpiredError:
						return [null, "Init data expired"];

				default:
					return [null, "Something wrong"];
			}
		}
	}

	public parseData(initData: string): null | TelegramUser {
		return parse(initData).user || null;
	}
}