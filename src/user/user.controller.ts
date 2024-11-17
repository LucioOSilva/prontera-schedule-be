import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { IRESTResponse } from '../service/RESTService';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() userData: UserDto): Promise<IRESTResponse<any>> {
    return await this.userService.createUser(userData);
  }
}
