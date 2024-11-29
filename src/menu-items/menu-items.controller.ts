import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItem } from '../schemas/menu-items.schema';
import { Roles } from 'src/auth/decorators/Roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { request } from 'express';
import { MenuItemDto } from './dto/menu-item.dto';
import { User } from 'src/auth/decorators/User';
import { LoggedUser } from 'src/auth/types';

@Controller('api/menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findById(@Param('id') id: string): Promise<MenuItem | null> {
    return this.menuItemsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async findAll(): Promise<MenuItem[] | null> {
    return this.menuItemsService.findAll();
  }

  @Roles('superadmin')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: MenuItemDto): Promise<MenuItem> {
    return this.menuItemsService.create(data);
  }

  @Roles('superadmin')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() menuItemDto: Partial<MenuItem>,
  ): Promise<MenuItem | null> {
    return this.menuItemsService.update(id, menuItemDto);
  }

  @Roles('superadmin')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<MenuItem | null> {
    return this.menuItemsService.delete(id);
  }
}
