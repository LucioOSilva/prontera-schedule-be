import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  HttpException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from '../schemas/user.schema';
import { User as UserDecorator } from 'src/auth/decorators/User';
import { Roles } from 'src/auth/decorators/Roles';
import { LoggedUser, Role } from 'src/auth/types';
import { UserDocument } from '../schemas/user.schema';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles('superadmin', 'admin', 'receptionist')
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createUser(
    @UserDecorator() loggedUser: LoggedUser,
    @Body() userData: UserDto,
  ): Promise<UserDocument> {
    return await this.userService.createUser(loggedUser, userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by-email/:email')
  async findByTenantAndEmail(
    @Param('email') email: string,
    @UserDecorator() loggedUser: LoggedUser,
  ): Promise<UserDocument> {
    return await this.userService.findByTenantAndEmail(
      loggedUser.tenantId,
      email,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by-id/:id')
  async findByTenantAndId(
    @Param('id') id: string,
    @UserDecorator() loggedUser: LoggedUser,
  ): Promise<UserDocument> {
    return await this.userService.findByTenantAndId(loggedUser.tenantId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by-role/:role')
  async findAllByRole(
    @Param('role') role: Role,
    @Query() filter: Partial<UserDto>,
    @UserDecorator() loggedUser: LoggedUser,
  ): Promise<UserDocument[]> {
    return await this.userService.findAllByRole(role, loggedUser, filter);
  }
}
