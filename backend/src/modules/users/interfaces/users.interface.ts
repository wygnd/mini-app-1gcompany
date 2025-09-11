import {Optional} from 'sequelize'

export interface IUserAttributes {
	userId: number;
	telegramId: number;
	role: UserRoles;
	name?: string;
	phone?: string;
	organization?: string;
}

export type IUserCreationAttributes = Optional<IUserAttributes, 'userId'>;

export enum UserRoles {
	ADMIN = "admin",
	USER = "user"
}