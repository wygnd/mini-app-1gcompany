import {Column, DataType, Model, Table} from "sequelize-typescript";
import {IRefundAttributes, IRefundCreationAttributes} from "../interfaces/refunds.interface";
import {ApiProperty} from "@nestjs/swagger";

@Table({
	tableName: "returns"
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
		allowNull: false
	})
	declare attachmentUrl: string;

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