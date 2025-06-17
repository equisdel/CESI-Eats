import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  customerId!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  items!: any;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;
}