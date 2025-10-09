import {Injectable, Logger} from "@nestjs/common";
import {Bot as TelegramBotApi, InputFile} from "grammy";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class TelegramClient {
	private readonly botApi: TelegramBotApi;
	private readonly botToken: string;
	private readonly logger = new Logger(TelegramClient.name, {timestamp: true});

	constructor(
		private readonly configService: ConfigService,
	) {
		this.botToken = this.configService.get<string>('telegramToken') ?? "";

		if (!this.botToken) this.logger.error("No token provided");

		this.botApi = new TelegramBotApi(this.botToken);
	}

	async sendDocument(file: Express.Multer.File, telegramUserId: number) {
		return await this.botApi.api.sendDocument(telegramUserId, new InputFile(file.buffer), {
			caption: file.originalname,
			disable_notification: true
		});
	}

	async getFile(fileId: string) {
		const {file_path} = await this.botApi.api.getFile(fileId);
		return `https://api.telegram.org/file/bot${this.botToken}/${file_path}`;
	}
}