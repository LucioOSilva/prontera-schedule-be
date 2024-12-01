import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from '../schemas/user.schema';
import { User as UserDecorator } from 'src/auth/decorators/User';
import { Roles } from 'src/auth/decorators/Roles';
import { LoggedUser } from 'src/auth/types';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles('superadmin', 'admin', 'receptionist')
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createUser(
    @UserDecorator() userReq: LoggedUser,
    @Body() userData: UserDto,
  ): Promise<User> {
    const user = await this.userService.createUser(userReq, userData);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by-email/:email')
  async getUserByEmail(
    @Param('email') email: string,
    @UserDecorator() userReq: User,
  ): Promise<any> {
    const user = await this.userService.findByTenantAndEmail(
      userReq.tenantId,
      email,
    );
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by-id/:id')
  async getUserById(
    @Param('id') id: string,
    @UserDecorator() userReq: User,
  ): Promise<any> {
    const user = await this.userService.findByTenantAndId(userReq.tenantId, id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }
}
