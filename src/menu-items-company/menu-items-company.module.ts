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
import { MenuItemsModule } from 'src/menu-items/menu-items.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItemsCompany.name, schema: MenuItemsCompanySchema },
      { name: MenuItem.name, schema: MenuItemSchema },
    ]),
    MenuItemsModule,
  ],
  controllers: [MenuItemsCompanyController],
  providers: [MenuItemsCompanyService, JwtService],
})
export class MenuItemsCompanyModule {}
