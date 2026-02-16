import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product data with images',
    schema: {
      type: 'object',
      required: ['name', 'category', 'quantity', 'price'],
      properties: {
        name: { type: 'string', description: 'Product name' },
        category: { type: 'number', description: 'Product category' },
        description: { type: 'string', description: 'Product description' },
        quantity: { type: 'number', description: 'Product quantity' },
        price: { type: 'number', description: 'Product price' },
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Product images'
        }
      }
    }
  })
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() images: Express.Multer.File[]) {
    return this.productsService.create(createProductDto, images);
  }

  @ApiOperation({ summary: 'Get all products with filters' })
  @ApiResponse({ status: 200, description: 'List of products' })
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }
  
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID (MongoDB ObjectId)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Get(':id')
  findOne(@Param() { id }: IsValidObjectId) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID (MongoDB ObjectId)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  update(@Param() { id }: IsValidObjectId, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID (MongoDB ObjectId)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param() { id }: IsValidObjectId) {
    return this.productsService.remove(id);
  }
}
