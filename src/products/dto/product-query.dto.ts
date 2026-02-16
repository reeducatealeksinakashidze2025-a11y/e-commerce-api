import { Exclude, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, Min } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductCategory } from '../enum/products-category.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ProductQueryDto extends PaginationDto {
 @ApiProperty({ description: 'Filter by active status', required: false })
 @IsOptional()
  @IsBoolean()
  @Exclude()
  isActive: boolean;
  @ApiProperty({ description: 'Filter by product category', enum: ProductCategory, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @ApiProperty({ description: 'Filter by minimum price', required: false })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  priceFrom?: number;

  @ApiProperty({ description: 'Filter by maximum price', required: false })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  priceTo?: number;
}
