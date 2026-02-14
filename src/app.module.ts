import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductsModule, 
    AuthModule, 
    UsersModule,
      ConfigModule.forRoot({
      isGlobal:true
    }),
   MongooseModule.forRoot( process.env.MONGO_URL!),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
