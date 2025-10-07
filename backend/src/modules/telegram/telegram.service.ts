import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {TelegramSuccessGetFileResponse, TelegramSuccessSendDocumentResponse} from "./interfaces/telegram.api.interface";
import {ApiService} from "../api/api.service";

@Injectable()
export class TelegramService {
	private readonly telegramApi: string;
	private readonly logger = new Logger(TelegramService.name, {timestamp: true});

	constructor(
		private readonly configService: ConfigService,
		private readonly apiService: ApiService
	) {
		this.telegramApi = "https://api.telegram.org/bot" + configService.get<string>('telegramToken');
	}

	async uploadFile(file: Express.Multer.File, userTelegramId: number): Promise<TelegramSuccessGetFileResponse> {

		const formData = new FormData();
		formData.append('chat_id', userTelegramId.toString());
		formData.append('document', file.buffer.toString());

		const data = await this.apiService.post<TelegramSuccessSendDocumentResponse>(`${this.telegramApi}/sendDocument`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			}
		});

		this.logger.debug('TELEGRAM SERVICE: telegram response', data);
		if (!data.result.document.file_id) throw new BadRequestException('Invalid document id');

		return await this.getFile(data.result.document.file_id);
	}

	async getFile(fileId: string): Promise<TelegramSuccessGetFileResponse> {
		return await this.apiService.get<TelegramSuccessGetFileResponse>(`${this.telegramApi}/getFile?file_id=${fileId}`);
	}

	async getFileLink(fileId: string): Promise<string> {
		const {result} = await this.getFile(fileId);
		return `${this.telegramApi}/${result.file_id}`;
	}
}