import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MenuItemsCompany,
  MenuItemsCompanyDocument,
} from '../schemas/menu-items-company.schema';
import { EntityService } from 'src/common/entity.service';
import { User } from 'src/auth/decorators/User';
import { LoggedUser } from 'src/auth/types';
import { MenuItemsCompanyDto } from './dto/menu-items-company.dto';
import { MenuItemsCompany as MenuItemsCompanyType } from './types';

@Injectable()
export class MenuItemsCompanyService extends EntityService<MenuItemsCompanyDocument> {
  constructor(
    @InjectModel(MenuItemsCompany.name)
    private readonly menuItemModel: Model<MenuItemsCompanyDocument>,
  ) {
    super(menuItemModel);
  }

  async createMenuItemsCompany(
    user: LoggedUser,
    menuItemsCompanyDto: MenuItemsCompanyDto,
  ): Promise<MenuItemsCompanyType> {
    const { tenantId } = user;
    menuItemsCompanyDto.tenantId = tenantId;
    return this.create(menuItemsCompanyDto);
  }

  async findMenuItemsCompanyByTenantAndRole(
    user: any,
  ): Promise<MenuItemsCompanyType> {
    const tenantId = user.tenantId;
    const role = user.role;
    const query = { tenantId, role };
    return await this.findOne(query);
  }
}
