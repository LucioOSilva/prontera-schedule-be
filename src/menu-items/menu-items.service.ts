import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem } from '../schemas/menu-items.schema';
import { EntityService } from 'src/common/entity.service';

@Injectable()
export class MenuItemsService extends EntityService<MenuItem> {
  constructor(
    @InjectModel(MenuItem.name)
    private readonly menuItemModel: Model<MenuItem>,
  ) {
    super(menuItemModel);
  }
}
