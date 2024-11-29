import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { MenuItemsCompanyService } from './menu-items-company.service';
import { MenuItemsCompanyDto } from './dto/menu-items-company.dto';
import { Request } from '@nestjs/common';
import { User } from 'src/auth/decorators/User';
import { Roles } from 'src/auth/decorators/Roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LoggedUser } from 'src/auth/types';
import { MenuItemsCompany, MenuItemsCompanyResponse } from './types';

@Controller('api/menu-items-company')
export class MenuItemsCompanyController {
  constructor(
    private readonly menuItemsCompanyService: MenuItemsCompanyService,
  ) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrUpdateClientMenuItemsCompany(
    @User() user: LoggedUser,
    @Body() menuItemsCompanyDto: MenuItemsCompanyDto,
  ): Promise<MenuItemsCompany> {
    return this.menuItemsCompanyService.createOrUpdateClientMenuItemsCompany(
      user,
      menuItemsCompanyDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by-tenant-role')
  async findMenuItemsCompanyByTenantAndRole(
    @User() user: LoggedUser,
  ): Promise<MenuItemsCompanyResponse> {
    return this.menuItemsCompanyService.findMenuItemsCompanyByTenantAndRole(
      user,
    );
  }

  // CRIAR METODO PARA CRIAR MENU DEFAULT PARA ADMIN

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMenuItemsCompanyDto: Partial<MenuItemsCompanyDto>,
  // ) {
  //   return this.menuItemsCompanyService.update(id, updateMenuItemsCompanyDto);
  // }
}
