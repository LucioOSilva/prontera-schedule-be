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

@Controller('api/menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findById(@Param('id') id: string): Promise<MenuItem | null> {
    const user = request.user;
    console.log(user);
    return this.menuItemsService.findById(id);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: MenuItemDto): Promise<MenuItem> {
    return this.menuItemsService.create(data);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() menuItemDto: Partial<MenuItem>,
  ): Promise<MenuItem | null> {
    return this.menuItemsService.update(id, menuItemDto);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<MenuItem | null> {
    return this.menuItemsService.delete(id);
  }
}
