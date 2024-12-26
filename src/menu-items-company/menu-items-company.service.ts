import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
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

  async createOrUpdateDefaultAdminMenuItemsCompany(
    tenantId: string,
  ): Promise<MenuItemsCompanyType> {
    const allMenuItemsIds = await this.menuItemModel.find();
    const itemsMenuStringIds = allMenuItemsIds
      .filter((item) => item.type === 'menu')
      .map((item) => item._id.toString());
    const itemsMenuConfigsStringIds = allMenuItemsIds
      .filter((item) => item.type === 'config')
      .map((item) => item._id.toString());
    const existingMenuItemsCompany = await this.menuItemCompanyModel.find({
      tenantId,
      role: 'admin',
    });
    if (existingMenuItemsCompany.length > 0) {
      const updateData = {
        menu: itemsMenuStringIds,
        menuConfigs: itemsMenuConfigsStringIds,
      };
      return this.updateById(existingMenuItemsCompany[0]._id, updateData);
    }
    return this.create({
      tenantId,
      role: 'admin',
      menu: itemsMenuStringIds,
      menuConfigs: itemsMenuConfigsStringIds,
    });
  }

  async createOrUpdateClientMenuItemsCompany(
    user: LoggedUser,
    menuItemsCompanyDto: MenuItemsCompanyDto,
  ): Promise<MenuItemsCompanyType> {
    const { tenantId } = user;
    menuItemsCompanyDto.tenantId = tenantId;
    menuItemsCompanyDto.role = 'patient';
    const menuItemsList = [
      ...menuItemsCompanyDto.menu,
      ...menuItemsCompanyDto.menuConfigs,
    ];

    const menuItemsObjectIds = menuItemsList.map((id) => new ObjectId(id));
    const menuItemsFound = await this.menuItemModel.find({
      _id: { $in: menuItemsObjectIds },
    });

    if (menuItemsFound.length !== menuItemsList.length) {
      throw new Error('Invalid menu item');
    }

    const existingMenuItemsCompany = await this.menuItemCompanyModel.find({
      tenantId,
      role: 'client',
    });
    if (existingMenuItemsCompany.length > 0) {
      const updateData = {
        menu: menuItemsCompanyDto.menu,
        menuConfigs: menuItemsCompanyDto.menuConfigs,
      };
      return this.updateById(existingMenuItemsCompany[0]._id, updateData);
    }

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
