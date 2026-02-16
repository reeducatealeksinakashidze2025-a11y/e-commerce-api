import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Shopping Cart')
@ApiBearerAuth('JWT-auth')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService
  ) {}

  @ApiOperation({ summary: 'Add item to cart' })
  @ApiParam({ name: 'userId', description: 'User ID (MongoDB ObjectId)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 201, description: 'Item added to cart' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post(':userId')
  create( @Param('userId') userId: string,
    @Body() createCartDto:  CreateCartDto) {
    return this.cartsService.create(userId, createCartDto);
  }

  @ApiOperation({ summary: 'Get all items in user cart' })
  @ApiParam({ name: 'userId', description: 'User ID (MongoDB ObjectId)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'List of cart items' })
  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.cartsService.findAll(userId);
  }

  @ApiOperation({ summary: 'Get cart item by ID' })
  @ApiParam({ name: 'id', description: 'Cart item ID', example: '1' })
  @ApiResponse({ status: 200, description: 'Cart item found' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiParam({ name: 'userId', description: 'User ID (MongoDB ObjectId)', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'productId', description: 'Product ID (MongoDB ObjectId)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Cart item updated' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @Patch(':userId/:productId')
  update( @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() updateCartItemDto:  UpdateCartDto) {
    return this.cartsService.update(userId, productId, updateCartItemDto);
  }

  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'userId', description: 'User ID (MongoDB ObjectId)', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'productId', description: 'Product ID (MongoDB ObjectId)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Item removed from cart' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @Delete(':userId/:productId')
  remove( @Param('userId') userId: string,
    @Param('productId') productId: string) {
    return this.cartsService.remove(userId, productId);
  }
}
