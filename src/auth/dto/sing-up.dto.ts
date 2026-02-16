import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length
} from 'class-validator';
import { Gender } from 'src/common/enums/gender.enum';
import { Role } from 'src/common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SingUpDto {
  @ApiProperty({ description: 'User full name' })
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @ApiProperty({ description: 'User email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Username for login' })
  @IsNotEmpty()
  @IsString()
  userName: string;
  @ApiProperty({ description: 'User gender', enum: Gender })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
  @ApiProperty({ description: 'User role', enum: Role, default: Role.USER })
  @IsEnum(Role)
  role: Role = Role.USER;;
  @IsString()
  @IsNotEmpty()
 @Length(6,10)
  password: string;

  @Type(() => Date)
@IsDate()
birthDate: Date;
}
