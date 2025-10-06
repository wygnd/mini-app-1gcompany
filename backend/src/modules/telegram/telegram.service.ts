import {Inject, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class TelegramService {
	private readonly telegramApi: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService,
	) {
		this.telegramApi = "https://api.telegram.org/bot" + configService.get<string>('telegramToken');
	}

	uploadFile(file: Express.Multer.File) {
		const formData = new FormData();
		formData.append('file', file.buffer.toString());

		return this.httpService.post(`${this.telegramApi}/sendDocument`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			}
		});
	}
}