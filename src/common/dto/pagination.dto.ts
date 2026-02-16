import { Transform } from 'class-transformer';
import { IsNumber, IsOptional,  Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ description: 'Page number', default: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(1)
  page: number = 1;

  @ApiProperty({ description: 'Items per page (max 100)', default: 30, required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Math.min(100, Number(value)))
  @Min(1)
  take: number = 30;
}