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
import { UserService } from './user.service';
import { IRESTResponse } from '../service/RESTService';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async register(@Body() authData: any): Promise<IRESTResponse<any>> {
    return await this.userService.createUser(authData);
  }
}
