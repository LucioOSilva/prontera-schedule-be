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
import { MenuItemDocument } from 'src/schemas/menu-items.schema';
import { MenuItem } from 'src/schemas/menu-items.schema';
import { MenuItemsCompanyResponse } from './types';
import { MenuItemType } from 'src/menu-items/types';

@Injectable()
export class MenuItemsCompanyService extends EntityService<MenuItemsCompanyDocument> {
  constructor(
    @InjectModel(MenuItemsCompany.name)
    private readonly menuItemCompanyModel: Model<MenuItemsCompanyDocument>,

    @InjectModel(MenuItem.name)
    private readonly menuItemModel: Model<MenuItemDocument>,
  ) {
    super(menuItemCompanyModel);
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
  ): Promise<MenuItemsCompanyResponse> {
    const { tenantId, role } = user;

    // Executa o aggregation com lookup nas coleções de menus e menuConfigs
    const result = await this.menuItemCompanyModel
      .aggregate([
        {
          $match: { tenantId, role }, // Encontra a empresa específica pelo tenantId e role
        },
        {
          // Converte os elementos do array `menu` de strings para ObjectId
          $addFields: {
            menuObjectIds: {
              $map: {
                input: '$menu',
                as: 'menuId',
                in: { $toObjectId: '$$menuId' },
              },
            },
            menuConfigObjectIds: {
              $map: {
                input: '$menuConfigs',
                as: 'configId',
                in: { $toObjectId: '$$configId' },
              },
            },
          },
        },
        {
          $lookup: {
            from: 'menuitems', // Nome da collection de menus (em lowercase no MongoDB)
            localField: 'menuObjectIds', // Campo convertido de string para ObjectId
            foreignField: '_id', // Campo _id em MenuItems
            as: 'menu', // Nome da propriedade no resultado
          },
        },
        {
          $lookup: {
            from: 'menuitems', // Nome da collection de menuConfigs
            localField: 'menuConfigObjectIds', // Campo convertido de string para ObjectId
            foreignField: '_id', // Campo _id em MenuConfigs
            as: 'menuConfigs', // Nome da propriedade no resultado
          },
        },
        {
          // Remove campos temporários
          $project: {
            menuObjectIds: 0,
            menuConfigObjectIds: 0,
          },
        },
      ])
      .exec();

    if (result.length === 0) {
      return null;
    }

    // Retorna o primeiro item, pois o aggregation retorna um array
    return result[0];
  }
}
