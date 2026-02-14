import { Exclude, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, Min } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductCategory } from '../enum/products-category.enum';

export class ProductQueryDto extends PaginationDto {
 @IsOptional()
  @IsBoolean()
  @Exclude()
  isActive: boolean;
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  priceFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  priceTo?: number;
}
