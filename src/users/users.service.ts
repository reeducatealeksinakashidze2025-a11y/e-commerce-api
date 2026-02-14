import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,

  ) { }
 

  findAll({ page, take }: PaginationDto) {
    return this.userModel
      .find()
      .skip((page - 1) * take)
      .limit(take)
      .exec();
  }

  async findOne(id: number) {
    const user = await this.userModel
      .findById(id).exec();
    if (!user)
      throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
    .findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    if (!updatedUser)
      throw new NotFoundException('user not found');

    return updatedUser;
  }

  async remove(id: number) {
    const deletedUser = await this.userModel
      .findByIdAndDelete(id);
    if (!deletedUser) 
      throw new NotFoundException('User not found');
    return deletedUser;
  }
}
