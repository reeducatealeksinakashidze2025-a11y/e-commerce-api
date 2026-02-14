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

export class SingUpDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  userName: string;
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
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
