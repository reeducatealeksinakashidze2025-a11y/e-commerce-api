import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TOKEN,
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
