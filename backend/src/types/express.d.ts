import {TelegramUser} from "../modules/telegram/interfaces/user-telegram.interface";

declare global {
	namespace Express {
		interface Request {
			user: TelegramUser;
		}
	}
}