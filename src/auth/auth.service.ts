import { BadRequestException, Injectable } from '@nestjs/common';
import { SingUpDto } from './dto/sing-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SingInDto } from './dto/sing-in.dto';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private userModel: Model<User>,
    private jwtService: JwtService
  ) { }

  async singUp(singUpDto: SingUpDto) {
    const existUser = await this.userModel.findOne({ email: singUpDto.email });
    if (existUser) throw new BadRequestException('User alredy exist');

    const hashedOassword = await bcrypt.hash(singUpDto.password, 10);
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    await this.userModel.create({
      fullName: singUpDto.fullName,
      userName: singUpDto.userName,
      email: singUpDto.email,
      gender: singUpDto.gender,
      role: singUpDto.role,
      password: hashedOassword,
      birthDate: singUpDto.birthDate,
      // subscriptionStartDate: startDate,
      // subscriptionEndDate: endDate,
    });
    return {
      success: true,
      message: 'User created successfully'
    };
  }

  async singIn(singInDto: SingInDto) {
    const existUser = await this.userModel
      .findOne({ email: singInDto.email })
      .select('+password');
    //   .select('+password');

    if (!existUser) throw new BadRequestException('invalid Credentials');

    const isPassEqual = await bcrypt.compare(
      singInDto.password,
      existUser.password,
    );
    if (!isPassEqual) throw new BadRequestException('invalid Credentials');

    const payload = {
      userId: existUser._id,
      role: existUser.role
    }
    var token = await this.jwtService.sign(payload, { expiresIn: '1h' })
    return {token};
  }

}
