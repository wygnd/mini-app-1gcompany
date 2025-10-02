import {Column, DataType, Table, Model, HasMany} from "sequelize-typescript";
import {IUserAttributes, IUserCreationAttributes, UserRoles} from "../interfaces/users.interface";
import {ApiProperty} from "@nestjs/swagger";
import {OrdersModel} from "../../orders/enitites/orders.entity";
import {RefundsModel} from "../../refunds/entities/refunds.entity";

@Table({tableName: "users"})
export class UserModel extends Model<IUserAttributes, IUserCreationAttributes> {

	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	@ApiProperty({
		name: "user id",
		type: "number",
		example: 1,
		description: "unique user id"
	})
	declare userId: number;

	@Column({type: DataType.BIGINT, unique: true, allowNull: false})
	@ApiProperty({
		name: "Telegram unique identifier",
		type: Number,
		example: 13223232323
	})
	declare telegramId: number;

	@Column({type: DataType.ENUM(...Object.values(UserRoles)), defaultValue: UserRoles.USER})
	@ApiProperty({
		name: "User role",
		type: "string",
		example: "user",
		enum: UserRoles,
		default: UserRoles.USER
	})
	declare role: UserRoles;

	@Column({type: DataType.STRING, allowNull: true})
	@ApiProperty({
		name: "user name",
		type: "string",
		example: "Alex"
	})
	declare name: string;

	@Column({type: DataType.STRING, allowNull: true})
	@ApiProperty({
		name: "user phone",
		type: "string",
		example: "+79123257389"
	})
	declare phone: string;

	@Column({type: DataType.STRING, allowNull: true})
	@ApiProperty({
		name: "Organization name",
		type: "string",
		example: "OOO Company"
	})
	declare organization: string;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
		allowNull: false
	})
	@ApiProperty({
		description: "Will user see notifications",
		type: Boolean,
		example: true
	})
	declare show_notifications: boolean;

	@HasMany(() => OrdersModel)
	orders: OrdersModel[];

	@HasMany(() => RefundsModel)
	refunds: RefundsModel[];
}