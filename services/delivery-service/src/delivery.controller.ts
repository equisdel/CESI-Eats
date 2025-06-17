import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryDto } from './dto/delivery.dto';
import { DeliveryGateway } from './gateway/delivery.gateway';

@Controller('delivery')
export class DeliveryController {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly deliveryGateway: DeliveryGateway,
  ) {}

  @Post()
  async create(@Body() deliveryDto: DeliveryDto) {
    const delivery = await this.deliveryService.create(deliveryDto);
    this.deliveryGateway.notifyDeliveryUpdate(delivery);
    return delivery;
  }

  @Get()
  async findAll() {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(id);
  }

  @Put(':id/status')
  async update(@Param('id') id: string, @Body('status') status: string) {
    const delivery = await this.deliveryService.update(id, status);
    this.deliveryGateway.notifyDeliveryUpdate(delivery);
    return delivery;
  }

  @Put(':id/assign')
  async assignDeliveryPerson(@Param('id') id: string, @Body('deliveryPersonId') deliveryPersonId: string) {
    const delivery = await this.deliveryService.assignDeliveryPerson(id, deliveryPersonId);
    this.deliveryGateway.notifyDeliveryUpdate(delivery);
    return delivery;
  }
}