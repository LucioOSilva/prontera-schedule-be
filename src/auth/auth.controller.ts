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
import { IRESTResponse } from '../service/RESTService';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() authData: any): Promise<IRESTResponse> {
    return this.authService.registerUser(authData);
  }

  @Post('/login')
  async login(@Body() authLogin: any): Promise<IRESTResponse> {
    return this.authService.login(authLogin);
  }
}
