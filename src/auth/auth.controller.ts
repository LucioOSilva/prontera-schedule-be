import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() authLogin: AuthDto): Promise<any> {
    return this.authService.login(authLogin);
  }

  @Get('/verify-token')
  async verifyToken(@Req() req: any): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token', token);
    return this.authService.verifyToken(token);
  }
}
