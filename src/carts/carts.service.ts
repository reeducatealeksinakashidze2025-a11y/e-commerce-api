import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schema/cart.schema';
import { Model, Types } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) { }
  async create(userId: string, createCartDto: CreateCartDto) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    if (!Types.ObjectId.isValid(createCartDto.productId)) {
      throw new BadRequestException('Invalid product ID');
    }

    let cart = await this.cartModel.findOne({
      userId: new Types.ObjectId(userId)
    });

    if (!cart) {
      // Create new cart if doesn't exist
      cart = new this.cartModel({
        userId: new Types.ObjectId(userId),
        items: [{
          productId: new Types.ObjectId(createCartDto.productId),
          quantity: createCartDto.quantity,
          price: createCartDto.price,
          addedAt: new Date()
        }]
      });
    } else {
      // Check if product already exists in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.productId.toString() === createCartDto.productId
      );

      if (existingItemIndex > -1) {
        // Update quantity if product exists
        cart.items[existingItemIndex].quantity += createCartDto.quantity;
        cart.items[existingItemIndex].price = createCartDto.price; // Update price
      } else {
        // Add new item
        cart.items.push({
          productId: new Types.ObjectId(createCartDto.productId),
          quantity: createCartDto.quantity,
          price: createCartDto.price,
          addedAt: new Date()
        });
      }
    }
  }

  async findAll(userId: string) {
   if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    let cart = await this.cartModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('items.productId', 'name price imageUrl')
      .exec();

    if (!cart) {
      cart = await this.cartModel.create({
        userId: new Types.ObjectId(userId),
        items: [],
        totalAmount: 0,
        totalItems: 0
      });
    }

    return cart;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update( userId: string, 
    productId: string, 
    updateCartDto:  UpdateCartDto) {
       if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    if (!Types.ObjectId.isValid(productId)) {
      throw new BadRequestException('Invalid product ID');
    }

    const cart = await this.cartModel.findOne({ 
      userId: new Types.ObjectId(userId) 
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Product not found in cart');
    }

  (cart.items[itemIndex] as any).quantity = updateCartDto.quantity;

    this.calculateTotals(cart);
    
    await cart.save();

    return this.cartModel
      .findById(cart._id)
      .populate('items.productId', 'name price images')
      .exec();
   
  }

  async remove(userId: string, productId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    if (!Types.ObjectId.isValid(productId)) {
      throw new BadRequestException('Invalid product ID');
    }

    const cart = await this.cartModel.findOne({ 
      userId: new Types.ObjectId(userId) 
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Product not found in cart');
    }

    cart.items.splice(itemIndex, 1);

    this.calculateTotals(cart);
    
    await cart.save();

    return this.cartModel
      .findById(cart._id)
      .populate('items.productId', 'name price images')
      .exec();
  }

async clearCart(userId: string) {
 if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    const cart = await this.cartModel.findOne({ 
      userId: new Types.ObjectId(userId) 
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = [];
    cart.totalAmount = 0;
    cart.totalItems = 0;

    await cart.save();

    return cart;
  }

   private calculateTotals(cart: CartDocument): void {
    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );
    
    cart.totalItems = cart.items.reduce(
      (sum, item) => sum + item.quantity, 
      0
    );
  }
}
