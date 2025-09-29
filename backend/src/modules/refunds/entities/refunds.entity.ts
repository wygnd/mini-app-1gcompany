import {Column, DataType, Model, Table} from "sequelize-typescript";
import {IRefundAttributes, IRefundCreationAttributes} from "../interfaces/refunds.interface";
import {ApiProperty} from "@nestjs/swagger";

@Table({
	tableName: "returns"
})
export class RefundsModel extends Model<IRefundAttributes, IRefundCreationAttributes> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	})
	@ApiProperty({
		type: Number,
		example: 1,
		description: "Unique refund identifier"
	})
	declare refundId: number;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	@ApiProperty({
		type: String,
		example: "OOO \"COMPANY NAME\"",
		description: "Company"
	})
	declare organization: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	@ApiProperty({
		type: String,
		example: "Gogolya street",
		description: "Address"
	})
	declare address: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	@ApiProperty({
		type: String,
		description: "Image url"
	})
	declare attachmentUrl: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	@ApiProperty({
		type: String,
		example: "10 boxes",
		description: "Count product"
	})
	declare countProduct: string;
}