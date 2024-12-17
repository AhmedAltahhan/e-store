/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VariantModule } from './variant/variant.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: config.get<number>("DB_PORT"),
          username: config.get<string>("DB_USERNAME"),
          password: config.get<string>("DB_PASSWORD"),
          database: config.get<string>("DB_DATABASE"),
          autoLoadEntities: true,
          synchronize: true,
        }
      }
    }),
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }),
  UserModule, VariantModule, ProductModule, CategoryModule, OrderModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
