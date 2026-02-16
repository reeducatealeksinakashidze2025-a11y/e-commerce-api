import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    ProductsModule, 
    AuthModule, 
    UsersModule,
      ConfigModule.forRoot({
      isGlobal:true
    }),
   MongooseModule.forRoot( process.env.MONGO_URL!),
   AwsS3Module,
   OrdersModule,
   CartsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
