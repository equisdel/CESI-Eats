import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DeliveryService } from '../delivery.service';
import { Delivery } from '../delivery.entity';

@WebSocketGateway({ cors: { origin: '*' } })
export class DeliveryGateway {
  @WebSocketServer()
 server!: Server;

  constructor(private readonly deliveryService: DeliveryService) {}

  @SubscribeMessage('trackDelivery')
  async handleTrackDelivery(@ConnectedSocket() client: Socket, @MessageBody() data: { deliveryId: string }) {
    const delivery = await this.deliveryService.findOne(data.deliveryId);
    if (delivery) {
      client.join(data.deliveryId);
      client.emit('deliveryUpdate', delivery);
    }
  }

  @SubscribeMessage('stopTracking')
  handleStopTracking(@ConnectedSocket() client: Socket, @MessageBody() data: { deliveryId: string }) {
    client.leave(data.deliveryId);
  }

  notifyDeliveryUpdate(delivery: Delivery) {
    this.server.to(delivery.id.toString()).emit('deliveryUpdate', delivery);
  }
}