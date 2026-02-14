import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Gender } from 'src/common/enums/gender.enum';
import { Role } from 'src/common/enums/role.enum';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  fullName: string;
  @Prop({
    type: String,
    required: true,
  })
  userName: string
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  })
  email: string;
  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password: string;
  @Prop({
    type: String,
    enum: Gender,
    required: true,
  })
  gender: Gender;
  // @Prop({
  //   type: Date,
  // })
  // subscriptionStartDate: Date;
  // @Prop({
  //   type: Date,
  // })
  // subscriptionEndDate: Date;
  @Prop({
    enum: Role,
    default: Role.USER,
  })
  role: Role;
  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;
  @Prop({
    type: Date,
    required: true,
  })
  birthDate: Date;
  // @Prop({
  //   type: [mongoose.Types.ObjectId],
  //   ref: 'Expenses',
  //   default: [],
  // })
  // expenses: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
