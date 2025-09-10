import {Model, Table} from "sequelize-typescript";
import {IOrderAttributes, IOrderCreationAttributes} from "../interfaces/orders.interface";

@Table({tableName: "orders"})
export class OrdersModel extends Model<IOrderAttributes, IOrderCreationAttributes> {

	

}