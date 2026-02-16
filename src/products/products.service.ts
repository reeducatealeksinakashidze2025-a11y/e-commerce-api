import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './schema/products.schema';
import { Model } from 'mongoose';
import { ProductQueryDto } from './dto/product-query.dto';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class ProductsService {
constructor( 
    private awsS3Service: AwsS3Service,
   @InjectModel(Products.name) private productModel: Model<Products>
   ) {}
  async create({category, name, quantity, price}: CreateProductDto, images: Express.Multer.File[]) {
     if (!category || !name || !quantity || !price )
      throw new HttpException('all fild is required', HttpStatus.BAD_REQUEST);

       let imageUrls: string[] = [];
        if (images && images.length > 0) {
      try {
        const uploadPromises = images.map(image => 
          this.awsS3Service.uploadFile(image.originalname, image.buffer, image.mimetype)
        );
        imageUrls = await Promise.all(uploadPromises);
      } catch (error) {
        console.error('Error uploading images to S3:', error);
        throw new HttpException(
          'Failed to upload images', 
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }

  

    const newExpense = this.productModel.create({
      category,
      name,
      quantity,
      price,
      images: imageUrls,
    });
    return newExpense;
  }

  async findAll({
    page,
    take,
    isActive,
    category,
    priceFrom,
    priceTo,
  }: ProductQueryDto) {
    let query = this.productModel.find();
    if (category) query = query.where('category').equals(category);
    if (priceFrom) query = query.where('price').gte(priceFrom);

    if (priceTo) query = query.where('price').lte(priceTo);

    if (isActive) query = query.where('isDiscounted').equals(isActive);

    return query.skip((page - 1) * take).limit(take);
  }

  async findOne(id: string) {
    const expense = await this.productModel.findById(id);
    if (!expense) throw new NotFoundException('product not found');
    return expense;
  }

  async update( id: string,
    {
      category,
      name,
      quantity,
      price,
      description,
    }: UpdateProductDto) {
    const existProduct = await this.productModel.findById(id);
    if (!existProduct) throw new NotFoundException('product not found');
    const productReq = {};
    if (category) productReq['category'] = category;
    if (name) productReq['name'] = name;
    if (description) productReq['description'] = description;
    if (quantity) productReq['quantity'] = quantity;
    if (price) productReq['price'] = price;
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      productReq,
      { new: true },
    );

    return updatedProduct;
  }

  async  remove(id: string) {
     const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) throw new NotFoundException('product not found');
    return deletedProduct;
  }
}
