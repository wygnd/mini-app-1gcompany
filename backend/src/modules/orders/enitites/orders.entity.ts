import {Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {IOrderAttributes, IOrderCreationAttributes} from "../interfaces/orders.interface";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "../../users/entities/users.entity";

@Table({tableName: "orders"})
export class OrdersModel extends Model<IOrderAttributes, IOrderCreationAttributes> {

	@ApiProperty({
		name: "order id",
		description: "unique order identifier",
		type: "number",
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
		type: "number",
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
		type: "string",
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
		type: "string"
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
		type: "string",
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
		type: "string",
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
		type: "string",
		example: "ООО Company"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	for: string;

	@ApiProperty({
		name: "Attachment",
		description: "",
		type: "string"
	})
	@Column({type: DataType.STRING, allowNull: false})
	attachment: string;

	@ForeignKey(() => UserModel)
	@Column({type: DataType.INTEGER, allowNull: false, field: "user_id"})
	userId: number;

	@HasOne(() => UserModel)
	user: UserModel;
}