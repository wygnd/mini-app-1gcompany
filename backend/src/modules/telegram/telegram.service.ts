import {Injectable} from "@nestjs/common";
import {TelegramClient} from "./telegram.client";

@Injectable()
export class TelegramService {

	constructor(
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