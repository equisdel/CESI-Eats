import { Model } from 'sequelize-typescript';
import { Order } from './order.entity';
export declare class User extends Model {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    orders: Order[];
}
