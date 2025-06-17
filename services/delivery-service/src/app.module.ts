import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryModule } from './delivery.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Delivery } from './delivery.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'cesi_eats',
      models: [Delivery],
      autoLoadModels: true,
      synchronize: true,
    }),
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


