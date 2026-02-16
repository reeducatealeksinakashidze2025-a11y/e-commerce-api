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
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
   @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
   @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ProductCategory)
  @Type(() => Number)
  category: ProductCategory;
 @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
 @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  quantity: number;
 @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;

}

