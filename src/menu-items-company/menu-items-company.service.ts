import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MenuItemsCompany,
  MenuItemsCompanyDocument,
} from '../schemas/menu-items-company.schema';
import { EntityService } from 'src/common/entity.service';

@Injectable()
export class MenuItemsCompanyService extends EntityService<MenuItemsCompanyDocument> {
  constructor(
    @InjectModel(MenuItemsCompany.name)
    private readonly menuItemModel: Model<MenuItemsCompanyDocument>,
  ) {
    super(menuItemModel);
  }
}
