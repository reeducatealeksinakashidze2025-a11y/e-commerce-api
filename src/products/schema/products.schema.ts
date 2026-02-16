import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductCategory } from '../enum/products-category.enum';

@Schema({
  timestamps: true
})
export class Products {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
    enum: ProductCategory,
  })
  category: ProductCategory;

  @Prop({
    type: String,
  })
  description?: string;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;
@Prop({
    type: [String],
    default: [],
  })
  images: string[];
}
export const productSchema = SchemaFactory.createForClass(Products);
