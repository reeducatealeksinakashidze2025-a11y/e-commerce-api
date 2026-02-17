import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop([{
    productId: { type: Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    price: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now }
  }])
  items: {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
    addedAt: Date;
  }[];

  @Prop({ type: Number, default: 0 })
  totalAmount: number;

  @Prop({ type: Number, default: 0 })
  totalItems: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

// CartSchema.index({ userId: 1 });
// CartSchema.index({ 'items.productId': 1 });