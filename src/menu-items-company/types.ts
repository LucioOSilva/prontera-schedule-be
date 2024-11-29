import { MenuItemType } from 'src/menu-items/types';

export type MenuItemsCompany = {
  tenantId: string;
  role: string;
  menu: string[];
  menuConfigs: string[];
};

export type MenuItemsCompanyResponse = {
  tenantId: string;
  role: string;
  menu: MenuItemType[];
  menuConfigs: MenuItemType[];
};
