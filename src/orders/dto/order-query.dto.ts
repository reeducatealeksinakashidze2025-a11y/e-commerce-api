import { IsOptional, IsEnum, IsString } from 'class-validator';
import { OrderStatus } from '../enum/order-status.enum';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrderQueryDto extends PaginationDto {
  @ApiProperty({ description: 'Filter by order status', enum: OrderStatus, required: false })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({ description: 'Filter by user ID', required: false })
  @IsOptional()
  @IsString()
  userId?: string;
}