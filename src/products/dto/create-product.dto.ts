import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ProductCategory } from '../enum/products-category.enum';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProductCategory)
  @Type(() => Number)
  category: ProductCategory;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;
  @IsNotEmpty()
  @IsBoolean()
  isDiscounted: boolean;
}

