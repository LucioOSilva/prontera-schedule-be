import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MenuItemsCompany,
  MenuItemsCompanyDocument,
} from '../schemas/menu-items-company.schema';
import { EntityService } from 'src/common/entity.service';
import { User } from 'src/auth/decorators/User';

@Injectable()
export class MenuItemsCompanyService extends EntityService<MenuItemsCompanyDocument> {
  constructor(
    @InjectModel(MenuItemsCompany.name)
    private readonly menuItemModel: Model<MenuItemsCompanyDocument>,
  ) {
    super(menuItemModel);
  }

  async findMenuItemsCompanyByTenantAndRole(user: any): Promise<any> {
    // criar a lógica para retornar o menu de acordo com o role e tenant
    const tenantId = user.tenantId;
    const role = user.role;
    const query = { tenantId, role };
    const user1 = await this.findOne(query);
    return user1;
  }
}
