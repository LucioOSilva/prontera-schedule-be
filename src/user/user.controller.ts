import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RESTResponse, IRESTResponse } from '../service/RESTService';
import { User } from '../schemas/user.schema';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() userData: UserDto): Promise<IRESTResponse<User>> {
    const user = await this.userService.createUser(userData);
    if (!user) throw new HttpException('User not created', 400);
    return RESTResponse(201, user, null);
  }

  @Get('/by-email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new HttpException('User not found', 404);
    return RESTResponse(200, user, null);
  }
}
