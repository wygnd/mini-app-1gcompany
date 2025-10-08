import {Injectable, Logger} from "@nestjs/common";
import {ApiService} from "../api/api.service";
import {TelegramClient} from "./telegram.client";

@Injectable()
export class TelegramService {
	private readonly logger = new Logger(TelegramService.name, {timestamp: true});

	constructor(
		private readonly apiService: ApiService,
		private readonly telegramClient: TelegramClient,
	) {
	}

	async uploadFile(file: Express.Multer.File, userTelegramId: number) {
		return await this.telegramClient.sendDocument(file, userTelegramId);
	}

	async getFileLinkById(fileId: string) {
		return await this.telegramClient.getFile(fileId);
	}
}