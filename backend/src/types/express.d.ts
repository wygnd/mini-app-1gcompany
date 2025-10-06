import {TelegramUserExtended} from "../modules/telegram/interfaces/user-telegram.interface";
import {File as MulterFile} from 'multer';

declare global {
	namespace Express {
		interface Request {
			user: TelegramUserExtended;
		}

		namespace Multer {
			interface File extends MulterFile {}
		}
	}
}