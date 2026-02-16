import {   IsEmail, IsEnum,  IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";
import { Role } from "src/common/enums/role.enum";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User first name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty({ description: 'User last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty({ description: 'User email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'User phone number (Georgian format)' })
  @IsNotEmpty()
  @IsPhoneNumber('GE')
  phoneNumber: string;
  @ApiProperty({ description: 'User gender', enum: Gender })
  @IsEnum(Gender)
  gender: Gender;
  @ApiProperty({ description: 'User role', enum: Role })
  @IsEnum(Role)
  role: Role;
}

