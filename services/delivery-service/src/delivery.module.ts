import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { DeliveryGateway } from './gateway/delivery.gateway';
import { Delivery } from './delivery.entity';

@Module({
  imports: [SequelizeModule.forFeature([Delivery])],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryGateway],
  exports: [DeliveryService, DeliveryGateway],
})
export class DeliveryModule {}