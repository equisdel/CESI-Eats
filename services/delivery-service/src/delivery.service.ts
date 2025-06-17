import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Delivery } from './delivery.entity';
import { DeliveryDto } from './dto/delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery)
    private deliveryModel: typeof Delivery,
  ) {}

  async create(deliveryDto: DeliveryDto): Promise<Delivery> {
    const deliveryData = { ...deliveryDto }; // spread to create a plain object
    return this.deliveryModel.create(deliveryData as any); // Temporary cast to resolve type mismatch
  }

  async findAll(): Promise<Delivery[]> {
    return this.deliveryModel.findAll();
  }

  async findOne(id: string): Promise<Delivery> {
    const delivery = await this.deliveryModel.findByPk(id);
    if (!delivery) {
      throw new NotFoundException(`Delivery with id ${id} not found`);
    }
    return delivery;
  }

  async findOneOrNull(id: string): Promise<Delivery | null> {
    return this.deliveryModel.findByPk(id);
  }

  async update(id: string, status: string): Promise<Delivery> {
    const delivery = await this.findOne(id); // This will throw NotFoundException if not found
    delivery.status = status;
    await delivery.save();
    return delivery;
  }

  async assignDeliveryPerson(id: string, deliveryPersonId: string): Promise<Delivery> {
    const delivery = await this.findOne(id); // This will throw NotFoundException if not found
    delivery.deliveryPersonId = deliveryPersonId;
    await delivery.save();
    return delivery;
  }
}