// src/menu-items-company/dto/create-menu-items-company.dto.ts
import {
  IsOptional,
  IsArray,
  IsString,
  IsNotEmpty,
  IsIn,
} from 'class-validator';

export class MenuItemsCompanyDto {
  @IsOptional()
  @IsString()
  tenantId?: string;

  @IsOptional()
  @IsString()
  @IsIn(['admin', 'client', 'guest'])
  role?: 'admin' | 'client' | 'guest';

  @IsArray()
  @IsString({ each: true })
  menu: string[]; // Array de ObjectIds de MenuItem

  @IsArray()
  @IsString({ each: true })
  menuConfigs: string[]; // Array de ObjectIds de MenuItem
}
