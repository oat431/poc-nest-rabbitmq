import { Module } from '@nestjs/common';
import { SaleDataProducer } from './producer/sale-data.producer';

@Module({
  providers: [SaleDataProducer],
  exports: [SaleDataProducer],
})
export class SaleDataModule {}
