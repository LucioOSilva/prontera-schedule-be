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
import { LoggedUser } from 'src/auth/types';
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
    const user = await this.userService.createUser(loggedUser, userData);
    return user;
    // TODO : Adicionar lógica para somente criar um user do mesmo tenant. (exceto "superadmin")
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by-email/:email')
  async getUserByEmail(
    @Param('email') email: string,
    @UserDecorator() loggedUser: LoggedUser,
  ): Promise<UserDocument> {
    const user = await this.userService.findByTenantAndEmail(
      loggedUser.tenantId,
      email,
    );
    if (!user) throw new HttpException('User not found', 404);
    return user;
    // TODO : Adicionar type no response
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by-id/:id')
  async getUserById(
    @Param('id') id: string,
    @UserDecorator() loggedUser: LoggedUser,
  ): Promise<UserDocument> {
    const user = await this.userService.findByTenantAndId(
      loggedUser.tenantId,
      id,
    );
    if (!user) throw new HttpException('User not found', 404);
    // TODO : Adicionar type no response
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/patients')
  async getPatients(
    @Query() filter: Partial<UserDto>,
    @UserDecorator() loggedUser: LoggedUser,
  ): Promise<UserDocument[]> {
    const patients = await this.userService.findAllPatients(loggedUser, filter);
    return patients;
  }
}
