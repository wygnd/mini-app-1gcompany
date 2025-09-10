import {Column, DataType, Table, Model} from "sequelize-typescript";
import {IUserAttributes, IUserCreationAttributes} from "../interfaces/users.interface";

@Table({tableName: "users"})
export class UserModel extends Model<IUserAttributes, IUserCreationAttributes> {

	@Column({type: DataType.STRING, unique: true, autoIncrement: true, primaryKey: true})
	userId: string;

	@Column({type: DataType.STRING, allowNull: false})
	name: string;

	@Column({type: DataType.STRING, allowNull: false})
	phone: string;

	
}