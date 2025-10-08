import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {IRefundAttributes, IRefundCreationAttributes} from "../interfaces/refunds.interface";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "../../users/entities/users.entity";

@Table({
	tableName: "refunds"
})
export class RefundsModel extends Model<IRefundAttributes, IRefundCreationAttributes> {
	@ApiProperty({
		type: Number,
		example: 1,
		description: "Unique refund identifier"
	})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	})
	declare refundId: number;

	@ForeignKey(() => UserModel)
	@Column({type: DataType.INTEGER, allowNull: false, field: "user_id"})
	declare userId: number;

	@BelongsTo(() => UserModel)
	declare user: UserModel;

	@ApiProperty({
		type: String,
		example: "Заявка на возврат",
		description: "Refund title"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	title: string;

	@ApiProperty({
		type: String,
		example: "OOO \"COMPANY NAME\"",
		description: "Company"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	declare organization: string;

	@ApiProperty({
		type: String,
		example: "Gogolya street",
		description: "Address"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	declare address: string;

	@ApiProperty({
		type: String,
		description: "Image url"
	})
	@Column({
		type: DataType.STRING,
		allowNull: true
	})
	declare attachmentUrl?: string;

	@ApiProperty({
		type: String,
		description: "Image id"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	declare attachmentId: string;

	@ApiProperty({
		type: String,
		example: "10 boxes",
		description: "Count product"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	declare countProduct: string;
}