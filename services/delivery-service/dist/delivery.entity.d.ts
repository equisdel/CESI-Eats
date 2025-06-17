import { Model } from 'sequelize-typescript';
export declare class Delivery extends Model<Delivery> {
    id: number;
    orderId: string;
    status: string;
    deliveryPersonId: string;
    deliveredAt: Date;
}
