import { DeliveryService } from './delivery.service';
import { DeliveryDto } from './dto/delivery.dto';
import { DeliveryGateway } from './gateway/delivery.gateway';
export declare class DeliveryController {
    private readonly deliveryService;
    private readonly deliveryGateway;
    constructor(deliveryService: DeliveryService, deliveryGateway: DeliveryGateway);
    create(deliveryDto: DeliveryDto): Promise<import("./delivery.entity").Delivery>;
    findAll(): Promise<import("./delivery.entity").Delivery[]>;
    findOne(id: string): Promise<import("./delivery.entity").Delivery>;
    update(id: string, status: string): Promise<import("./delivery.entity").Delivery>;
    assignDeliveryPerson(id: string, deliveryPersonId: string): Promise<import("./delivery.entity").Delivery>;
}
