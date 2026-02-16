import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({ description: 'Product ID', example: '507f1f77bcf86cd799439011' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Product quantity', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Product price', example: 29.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}