// src/menu-items-company/dto/create-menu-items-company.dto.ts
import { IsArray, IsString } from 'class-validator';

export class MenuItemsCompanyDto {
  @IsString()
  tenantId: string;

  @IsString()
  role: string;

  @IsArray()
  @IsString({ each: true })
  menu: string[]; // Array de ObjectIds de MenuItem

  @IsArray()
  @IsString({ each: true })
  menuConfigs: string[]; // Array de ObjectIds de MenuItem
}