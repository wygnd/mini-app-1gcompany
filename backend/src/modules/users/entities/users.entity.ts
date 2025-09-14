import {Column, DataType, Table, Model, HasMany} from "sequelize-typescript";
import {IUserAttributes, IUserCreationAttributes, UserRoles} from "../interfaces/users.interface";
import {ApiProperty} from "@nestjs/swagger";
import {OrdersModel} from "../../orders/enitites/orders.entity";

@Table({tableName: "users"})
export class UserModel extends Model<IUserAttributes, IUserCreationAttributes> {

	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	@ApiProperty({
		name: "user id",
		type: "number",
		example: 1,
		description: "unique user id"
	})
	userId: number;

	@Column({type: DataType.STRING, unique: true, allowNull: false})
	@ApiProperty({
		name: "Telegram unique identifier",
		type: "string",
		example: "9783642879623879"
	})
	telegramId: string;

	@Column({type: DataType.ENUM(...Object.values(UserRoles)), defaultValue: UserRoles.USER})
	@ApiProperty({
		name: "User role",
		type: "string",
		example: "user",
		enum: UserRoles,
		default: UserRoles.USER
	})
	role: UserRoles;

	@Column({type: DataType.STRING, allowNull: true})
	@ApiProperty({
		name: "user name",
		type: "string",
		example: "Alex"
	})
	name: string;

	@Column({type: DataType.STRING, allowNull: true})
	@ApiProperty({
		name: "user phone",
		type: "string",
		example: "+79123257389"
	})
	phone: string;

	@Column({type: DataType.STRING, allowNull: true})
	@ApiProperty({
		name: "Organization name",
		type: "string",
		example: "OOO Company"
	})
	organization: string;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
		allowNull: false
	})
	@ApiProperty({
		description: "Will user see notifications",
		type: Boolean,
		example: false
	})
	show_notifications: boolean;

	@HasMany(() => OrdersModel)
	orders: OrdersModel[]
}