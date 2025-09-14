import { Request } from 'express';
import {TelegramUser} from "../../modules/telegram/interfaces/user-telegram.interface";

export interface CustomRequest extends Request {
	user: TelegramUser
}