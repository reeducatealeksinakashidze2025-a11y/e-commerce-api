import { IsNotEmpty, IsArray, IsString, IsOptional, ValidateNested, IsNumber, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../enum/order-status.enum';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ description: 'Product ID', example: '507f1f77bcf86cd799439011' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Quantity of this product', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Price per unit', example: 29.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}

class ShippingAddressDto {
  @ApiProperty({ description: 'Street address', example: 'Rustaveli Avenue 1' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ description: 'City name', example: 'Tbilisi' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'Postal code', example: '0100' })
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @ApiProperty({ description: 'Country name', example: 'Georgia' })
  @IsNotEmpty()
  @IsString()
  country: string;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'User ID', example: '507f1f77bcf86cd799439011' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Array of order items', type: [OrderItemDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ description: 'Shipping address details', type: ShippingAddressDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @ApiProperty({ description: 'Payment method', example: 'credit_card' })
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @ApiProperty({ description: 'Order notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
