import {Column, DataType, Table, Model} from "sequelize-typescript";
import {IUserAttributes, IUserCreationAttributes, UserRoles} from "../interfaces/users.interface";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: "users"})
export class UserModel extends Model<IUserAttributes, IUserCreationAttributes> {

	@Column({type: DataType.STRING, unique: true, autoIncrement: true, primaryKey: true})
	@ApiProperty({
		name: "user id",
		type: "number",
		example: 1,
		description: "unique user id"
	})
	userId: string;

	@Column({type: DataType.STRING, unique: true})
	@ApiProperty({
		name: "Telegram unique identifier",
		type: "string",
		example: "9783642879623879"
	})
	telegramId: string;

	@Column({type: DataType.ENUM(...Object.values(UserRoles))})
	@ApiProperty({
		name: "User role",
		type: "string",
		example: "user",
		enum: UserRoles
	})
	role: UserRoles;

	@Column({type: DataType.STRING, allowNull: false})
	@ApiProperty({
		name: "user name",
		type: "string",
		example: "Alex"
	})
	name: string;

	@Column({type: DataType.STRING, allowNull: false})
	@ApiProperty({
		name: "user phone",
		type: "string",
		example: "+79123257389"
	})
	phone: string;

	@Column({type: DataType.STRING, allowNull: false})
	@ApiProperty({
		name: "Organization name",
		type: "string",
		example: "OOO Company"
	})
	organization: string;
}