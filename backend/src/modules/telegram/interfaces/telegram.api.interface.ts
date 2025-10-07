interface TelegramSuccessResponse {
	ok: boolean;
	description?: string;
}

interface TelegramChatObject {
	id: 123456789,
	first_name: string
	last_name: string
	username: string
	type: string
}

interface TelegramDocumentObject {
	file_id: string
	file_name: string
	mime_type: string
	thumb: {
		file_id: string
		file_size: number,
		width: number,
		height: number
	},
	file_size: number
}

interface TelegramUserObject {
	id: number,
	first_name: string
	username: string
}

interface TelegramFileObject {
	file_id: string,
	file_size: number,
	file_path: string
}

export interface TelegramSuccessSendDocumentResponse extends TelegramSuccessResponse {
	result: {
		message_id: number,
		from: TelegramUserObject,
		chat: TelegramChatObject,
		date: number,
		document: TelegramDocumentObject,
		caption: string
	}
}

export interface TelegramSuccessGetFileResponse extends TelegramSuccessResponse {
	result: TelegramFileObject;
}