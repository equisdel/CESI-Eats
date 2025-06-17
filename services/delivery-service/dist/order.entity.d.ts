import { Model } from 'sequelize-typescript';
export declare class Order extends Model<Order> {
    id: number;
    customerId: string;
    items: any;
    status: string;
}
