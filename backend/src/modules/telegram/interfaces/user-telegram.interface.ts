export interface TelegramUser {
	added_to_attachment_menu?: boolean | undefined;
	allows_write_to_pm?: boolean | undefined;
	first_name: string;
	id: number;
	is_bot?: boolean | undefined;
	is_premium?: boolean | undefined;
	last_name?: string | undefined;
	language_code?: string | undefined;
	photo_url?: string | undefined;
	username?: string | undefined;
}