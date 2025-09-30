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

	public validateData(initData: string): TelegramUser | null {
		try {
			validate(initData, this.telegramToken);
			return this.parseData(initData);
		} catch (error) {
			switch (true) {
				case error instanceof SignatureInvalidError:
					throw new UnauthorizedException("Signature is invalid")

					case error instanceof AuthDateInvalidError:
						throw new UnauthorizedException("Auth date is empty or not found")

					case error instanceof SignatureMissingError:
						throw new UnauthorizedException("Hash is empty or not found")

					case error instanceof ExpiredError:
						throw new UnauthorizedException("Init data expired")

				default:
					throw new UnauthorizedException("Something wrong")
			}
		}
	}

	public parseData(initData: string): null | TelegramUser {
		return parse(initData).user || null;
	}
}