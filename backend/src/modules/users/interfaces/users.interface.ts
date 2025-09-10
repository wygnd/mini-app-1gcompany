import {Optional} from 'sequelize'

export interface IUserAttributes {
	userId: string;
	name: string;
	phone: string;
	organization: string;
}

export type IUserCreationAttributes = Optional<IUserAttributes, 'userId'>;