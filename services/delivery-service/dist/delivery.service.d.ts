import { Delivery } from './delivery.entity';
import { DeliveryDto } from './dto/delivery.dto';
export declare class DeliveryService {
    private deliveryModel;
    constructor(deliveryModel: typeof Delivery);
    create(deliveryDto: DeliveryDto): Promise<Delivery>;
    findAll(): Promise<Delivery[]>;
    findOne(id: string): Promise<Delivery>;
    findOneOrNull(id: string): Promise<Delivery | null>;
    update(id: string, status: string): Promise<Delivery>;
    assignDeliveryPerson(id: string, deliveryPersonId: string): Promise<Delivery>;
}
