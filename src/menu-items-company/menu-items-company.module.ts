import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemsCompanyService } from './menu-items-company.service';
import { MenuItemsCompanyController } from './menu-items-company.controller';
import {
  MenuItemsCompany,
  MenuItemsCompanySchema,
} from '../schemas/menu-items-company.schema';
import { MenuItem, MenuItemSchema } from '../schemas/menu-items.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItemsCompany.name, schema: MenuItemsCompanySchema },
      { name: MenuItem.name, schema: MenuItemSchema },
    ]),
  ],
  providers: [MenuItemsCompanyService, JwtService],
  controllers: [MenuItemsCompanyController],
})
export class MenuItemsCompanyModule {}
