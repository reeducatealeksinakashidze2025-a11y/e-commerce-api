import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, productSchema } from './schema/products.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
    imports: [
    MongooseModule.forFeature([
      {
        name: Products.name,
        schema: productSchema,
      },
    ]),
      AwsS3Module
   
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
