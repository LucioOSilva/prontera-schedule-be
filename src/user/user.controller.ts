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
import { User } from '../schemas/user.schema';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() userData: UserDto): Promise<User> {
    const user = await this.userService.createUser(userData);
    if (!user) throw new HttpException('User already exists', 400);
    return user;
  }

  @Get('/by-email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }
}
