
export enum UserRoles {
	ADMIN = "admin",
	USER = "user"
}

export interface User {
	userId: number;
	telegramId: number;
	role: UserRoles;
	name?: string;
	phone?: string;
	organization?: string;
}
