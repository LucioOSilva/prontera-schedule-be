import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Headers,
  Param,
  Delete,
  Res,
  Req,
  HttpStatus,
  Options,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() authLogin: AuthDto): Promise<any> {
    return this.authService.login(authLogin);
  }
}
