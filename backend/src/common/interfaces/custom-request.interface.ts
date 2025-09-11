import { Request } from 'express';
import {TelegramUser} from "../../modules/users/interfaces/user-telegram.interface";

export interface CustomRequest extends Request {
	user: TelegramUser
}