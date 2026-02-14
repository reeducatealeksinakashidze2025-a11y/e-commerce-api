import {   IsEmail, IsEnum,  IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";
import { Role } from "src/common/enums/role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsPhoneNumber('GE')
  phoneNumber: string;
  @IsEnum(Gender)
  gender: Gender;
  @IsEnum(Role)
  role: Role;
}

