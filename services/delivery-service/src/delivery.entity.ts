import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'deliveries' })
export class Delivery extends Model<Delivery> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number; // Definite assignment assertion

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  orderId!: string; // Definite assignment assertion

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status!: string; // Definite assignment assertion

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deliveryPersonId!: string; // Definite assignment assertion

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deliveredAt!: Date; // Definite assignment assertion
}