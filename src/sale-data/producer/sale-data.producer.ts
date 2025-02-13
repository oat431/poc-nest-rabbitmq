import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { SaleData } from '../entity/sale-data.entity';
import * as cron from 'node-cron';
import { randomUUID } from 'crypto';

@Injectable()
export class SaleDataProducer {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: process.env.RABBITMQ_QUEUE_NAME || 'default_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  // ✅ Publish Message to RabbitMQ Queue
  async sendMessage(type: string, data: SaleData[]): Promise<void> {
    console.log(`Publishing message to RabbitMQ:`, { type, data });
    await this.client.emit(type, data).toPromise();
  }

  onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    cron.schedule('* * * * *', async () => {
      console.log('🚀 Running Scheduled Job at 00:01 PM...');
      const data: SaleData = {
        id: randomUUID(),
        amount: 100,
        product: 'Laptop',
        createdAt: new Date(),
      };
      const data2: SaleData = {
        id: randomUUID(),
        amount: 200,
        product: 'Smartphone',
        createdAt: new Date(),
      };
      const data3: SaleData = {
        id: randomUUID(),
        amount: 300,
        product: 'Tablet',
        createdAt: new Date(),
      };
      const allData = [data, data2, data3];
      await this.sendMessage('JSON', allData);
      console.log('✅ Message sent successfully at 00:01 PM');
    });

    console.log(
      '⏳ RabbitMQ Producer is now scheduled to send messages at 00:01 PM daily.',
    );
  }
}
