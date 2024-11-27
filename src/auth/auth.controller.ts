import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Token } from './types';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() authLogin: AuthDto): Promise<Token> {
    return this.authService.login(authLogin);
  }

  @Get('/verify-token')
  async verifyToken(@Req() req: any): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1];
    return this.authService.verifyToken(token);
  }
}
