import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/sing-up.dto';
import { SingInDto } from './dto/sing-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 @Post('sign-up')
  singUp(@Body() singUpDto: SingUpDto) {
    return this.authService.singUp(singUpDto);
  }

  @Post('sign-in')
  singIn(@Body() singInDto:SingInDto) {
    return this.authService.singIn(singInDto)
  }


}
