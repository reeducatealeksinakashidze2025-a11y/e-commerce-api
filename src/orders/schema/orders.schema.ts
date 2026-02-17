import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([{
    productId: { type: Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  }])
  items: {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true, 
    enum: [
        'pending', 
        'processing', 
        'shipped', 
        'delivered',
         'cancelled'] 
        })
  status: string;

  @Prop({ type: Object })
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };

  @Prop()
  paymentMethod: string;

  @Prop()
  notes: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);