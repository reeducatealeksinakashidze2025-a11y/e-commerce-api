import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schema/orders.schema';
import { OrderQueryDto } from './dto/order-query.dto';
import { CartsService } from 'src/carts/carts.service';

@Injectable()
export class OrdersService {
   constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private cartService: CartsService
  ) {}
  create(createOrderDto: CreateOrderDto) {
    const totalAmount = createOrderDto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new this.orderModel({
      ...createOrderDto,
      totalAmount,
      status: 'pending'
    });

    return order.save();
  }

    async findAll(query: OrderQueryDto) {
    const { page = 1, take = 10, status, userId } = query;
    const skip = (page - 1) * take;

    const filter: any = {};
    if (status) filter.status = status;
    if (userId) filter.userId = new Types.ObjectId(userId);

    const [orders, total] = await Promise.all([
      this.orderModel
        .find(filter)
        .populate('userId', 'name email')
        .populate('items.productId', 'name price')
        .skip(skip)
        .limit(take)
        .sort({ createdAt: -1 })
        .exec(),
      this.orderModel.countDocuments(filter)
    ]);

    return {
      data: orders,
      total,
      page,
      take,
      totalPages: Math.ceil(total / take)
    };
  }

  async findOne(id: string): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid order ID');
    }

    const order = await this.orderModel
      .findById(id)
      .populate('userId', 'name email')
      .populate('items.productId', 'name price')
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async findByUser(userId: string, query: OrderQueryDto) {
    return this.findAll({ ...query, userId });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid order ID');
    }

    const order = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .populate('userId', 'name email')
      .populate('items.productId', 'name price')
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid order ID');
    }

    const result = await this.orderModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
  async createOrderFromCart(
    userId: string,
    shippingAddress: any,
    paymentMethod?: string,
  ): Promise<Order> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    const cart = await this.cartService.findAll(userId);

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    if (!shippingAddress) {
      throw new BadRequestException('Shipping address is required');
    }

    if (!paymentMethod) {
      throw new BadRequestException('Payment method is required');
    }

    const orderDto: CreateOrderDto = {
      userId,
      items: cart.items.map(item => ({
        productId: (item.productId as any)._id.toString(),
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress,
      paymentMethod
    };

    const order = await this.create(orderDto);

    await this.cartService.clearCart(userId);

    return order;
  }
}

