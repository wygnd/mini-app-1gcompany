import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {IOrderAttributes, IOrderCreationAttributes, OrdersStatus} from "../interfaces/orders.interface";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "../../users/entities/users.entity";

@Table({tableName: "orders"})
export class OrdersModel extends Model<IOrderAttributes, IOrderCreationAttributes> {

	@ApiProperty({
		name: "orders id",
		description: "unique orders identifier",
		type: Number,
		example: 1,
	})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	orderId: number;

	@ApiProperty({
		name: "Date of pick",
		type: Number,
		description: "Дата забора",
		example: 1757522685078,
	})
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		field: "pick_date"
	})
	pickDate: number;

	@ApiProperty({
		name: "Kind of pick address",
		type: String,
		description: "Место забора (ЮВ, ТЯК, Садовод, склад поставщика)",
		example: "Склад поставщика",
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
		field: "pick_type"
	})
	pickType: string;

	@ApiProperty({
		name: "Pick address",
		description: "Точный адрес забора (номер линии, павильона, адрес)",
		type: String,
		example: "Mira street 40"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
		field: "pick_address"
	})
	pickAddress: string;

	@ApiProperty({
		name: "Products",
		description: "Объем или количество товара",
		type: String,
		example: "100кг"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	product: string;

	@ApiProperty({
		name: "Provider",
		description: "Контакт поставщика",
		type: String,
		example: "+7926174956"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	provider: string;

	@ApiProperty({
		name: "For who",
		description: "Для кого",
		type: String,
		example: "ООО Company"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	for: string;

	@ApiProperty({
		name: "Attachment",
		description: "Attachment",
		type: String,
		example: "id"
	})
	@Column({type: DataType.STRING, allowNull: false})
	attachment: string;

	@ApiProperty({
		name: "Order status",
		type: String,
		enum: OrdersStatus,
		example: OrdersStatus.PENDING,
		default: OrdersStatus.WAITING_PICKUP
	})
	@Column({type: DataType.ENUM(...Object.values(OrdersStatus)), allowNull: false, defaultValue: OrdersStatus.WAITING_PICKUP})
	status: OrdersStatus;

	@ForeignKey(() => UserModel)
	@Column({type: DataType.INTEGER, allowNull: false, field: "user_id"})
	userId: number;

	@BelongsTo(() => UserModel)
	user: UserModel;
}