import { Server, Socket } from 'socket.io';
import { DeliveryService } from '../delivery.service';
import { Delivery } from '../delivery.entity';
export declare class DeliveryGateway {
    private readonly deliveryService;
    server: Server;
    constructor(deliveryService: DeliveryService);
    handleTrackDelivery(client: Socket, data: {
        deliveryId: string;
    }): Promise<void>;
    handleStopTracking(client: Socket, data: {
        deliveryId: string;
    }): void;
    notifyDeliveryUpdate(delivery: Delivery): void;
}
