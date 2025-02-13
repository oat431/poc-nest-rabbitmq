import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaleDataModule } from './sale-data/sale-data.module';

@Module({
  imports: [ConfigModule.forRoot(), SaleDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
