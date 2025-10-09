
export interface UserInterface {
	userId: number;
	telegramId: number;
	name: string;
	phone?: string;
	organization?: string;
	show_notifications: boolean;
	role: "user" | "admin";
}

export interface UserStore {
	user: UserInterface | null;
	setUser: (user: UserInterface | null) => void;
	isAdmin: () => boolean;
}