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

@Controller('api/menu-items-company')
export class MenuItemsCompanyController {
  constructor(
    private readonly menuItemsCompanyService: MenuItemsCompanyService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createMenuItemsCompany(
    @User() user: LoggedUser,
    @Body() menuItemsCompanyDto: MenuItemsCompanyDto,
  ) {
    return this.menuItemsCompanyService.createMenuItemsCompany(
      user,
      menuItemsCompanyDto,
    );
  }

  @Get('/id/:id')
  async findById(@Param('id') id: string) {
    return this.menuItemsCompanyService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by-tenant-role')
  async findMenuItemsCompanyByTenantAndRole(@User() user: any) {
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
