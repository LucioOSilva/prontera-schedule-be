// src/menu-items/menu-items.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItem } from '../schemas/menu-items.schema';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  async findAll(): Promise<MenuItem[]> {
    return this.menuItemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<MenuItem | null> {
    return this.menuItemsService.findById(id);
  }

  @Post()
  async create(@Body() menuItemDto: Partial<MenuItem>): Promise<MenuItem> {
    return this.menuItemsService.create(menuItemDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() menuItemDto: Partial<MenuItem>,
  ): Promise<MenuItem | null> {
    return this.menuItemsService.update(id, menuItemDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<MenuItem | null> {
    return this.menuItemsService.delete(id);
  }
}
